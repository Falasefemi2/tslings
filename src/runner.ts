import path from "node:path";
import { checkFile, projectRoot, type TypeDiagnostic } from "./checker.ts";
import { checkGuard } from "./guard.ts";
import type { ExerciseMeta } from "./manifest.ts";

export interface SubprocessResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
}

export interface CheckResult {
  ok: boolean;
  stage: "guard" | "type" | "runtime" | "test" | "ok";
  guardReason?: string;
  guardLine?: number;
  diagnostics?: TypeDiagnostic[];
  stdout?: string;
  stderr?: string;
  exitCode?: number | null;
  timedOut?: boolean;
  testsPass?: number;
  testsFail?: number;
  message?: string;
}

export async function runSubprocess(cmd: string[], timeoutMs: number): Promise<SubprocessResult> {
  const proc = Bun.spawn(cmd, { stdout: "pipe", stderr: "pipe" });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    try {
      proc.kill();
    } catch {
      /* already exited */
    }
  }, timeoutMs);
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout as ReadableStream).text().catch(() => ""),
    new Response(proc.stderr as ReadableStream).text().catch(() => ""),
    proc.exited.then((c) => c as number).catch(() => null as number | null),
  ]);
  clearTimeout(timer);
  return { stdout, stderr, exitCode, timedOut };
}

export function stdoutMatches(actual: string, expected: string): boolean {
  const a = actual.replace(/\r\n/g, "\n").trimEnd();
  const e = expected.replace(/\r\n/g, "\n").trimEnd();
  if (e.length >= 2 && e.startsWith("/") && e.lastIndexOf("/") > 0) {
    const last = e.lastIndexOf("/");
    const body = e.slice(1, last);
    const flags = e.slice(last + 1);
    try {
      return new RegExp(body, flags).test(a);
    } catch {
      return false;
    }
  }
  return a === e;
}

export function parseBunTestCounts(combined: string): { pass: number; fail: number } {
  const pm = combined.match(/(\d+)\s+pass/);
  const fm = combined.match(/(\d+)\s+fail/);
  return {
    pass: pm ? parseInt(pm[1] as string, 10) : 0,
    fail: fm ? parseInt(fm[1] as string, 10) : 0,
  };
}

/**
 * Full check for one exercise: guard -> type-check -> (run | test).
 * Pass fileOverride to check a copy outside exercises/ (used by `verify`).
 */
export async function checkExercise(meta: ExerciseMeta, fileOverride?: string): Promise<CheckResult> {
  const root = projectRoot();
  const abs = fileOverride ?? path.join(root, "exercises", meta.dir, meta.file);
  let source: string;
  try {
    source = await Bun.file(abs).text();
  } catch {
    return { ok: false, stage: "type", message: `File not found: ${meta.dir}/${meta.file}` };
  }

  const guard = checkGuard(source, meta);
  if (guard) {
    return { ok: false, stage: "guard", guardReason: guard.reason, guardLine: guard.line };
  }

  const diagnostics = checkFile(abs);
  if (diagnostics.length > 0) {
    return { ok: false, stage: "type", diagnostics };
  }

  if (meta.mode === "compile") {
    return { ok: true, stage: "ok" };
  }

  const timeout = meta.timeoutMs ?? 5000;
  if (meta.mode === "run") {
    const r = await runSubprocess(["bun", "run", abs], timeout);
    if (r.timedOut) {
      return { ...r, ok: false, stage: "runtime", message: `Timed out after ${timeout}ms. Check for an infinite loop.` };
    }
    if (r.exitCode !== 0) {
      return { ...r, ok: false, stage: "runtime", message: `Process exited with code ${r.exitCode}.` };
    }
    if (meta.expectedStdout !== undefined && !stdoutMatches(r.stdout, meta.expectedStdout)) {
      return { ...r, ok: false, stage: "runtime", message: "stdout did not match the expected output." };
    }
    return { ...r, ok: true, stage: "ok" };
  }

  // mode === "test"
  const r = await runSubprocess(["bun", "test", abs], timeout);
  const counts = parseBunTestCounts(r.stdout + "\n" + r.stderr);
  const base = { ...r, testsPass: counts.pass, testsFail: counts.fail };
  if (r.timedOut) {
    return { ...base, ok: false, stage: "test", message: `Timed out after ${timeout}ms. Check for an infinite loop.` };
  }
  if (r.exitCode !== 0 || counts.fail > 0) {
    return { ...base, ok: false, stage: "test", message: `bun test failed (exit code ${r.exitCode}, ${counts.fail} failing).` };
  }
  if (meta.expectedTests !== undefined && counts.pass !== meta.expectedTests) {
    return {
      ...base,
      ok: false,
      stage: "test",
      message: `Expected ${meta.expectedTests} tests to run, but ${counts.pass} ran. Do not delete or skip tests.`,
    };
  }
  return { ...base, ok: true, stage: "ok" };
}
