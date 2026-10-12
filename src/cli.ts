#!/usr/bin/env bun
import path from "node:path";
import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { createInterface } from "node:readline/promises";
import { EXERCISES, getExercise, type ExerciseMeta } from "./manifest.ts";
import { checkFile, formatDiagnostic, projectRoot } from "./checker.ts";
import { checkExercise, type CheckResult } from "./runner.ts";
import { bold, cyan, dim, green, pad, progressBar, red, yellow } from "./report.ts";
import { cachedSolved, hashContent, markSolved } from "./state.ts";

function usage(): void {
  console.log(`tslings — learn TypeScript by fixing small broken programs.

Usage:
  bun src/cli.ts [command] [N] [--yes]
  bun run <script> [N] [--yes]

Commands:
  start        Check exercises in order, stop at the first failure (default)
  check        Same as start
  run N        Check only exercise N
  watch        Re-check the current exercise on every save
  hint [N]     Show the hint (defaults to the current exercise)
  list         Show all exercises with solved/unsolved marks
  reset N      Restore exercise N from its pristine copy (--yes skips confirm)
  solution N   Print the reference solution (requires --yes)
  verify       Maintainer: pristine fails + solution passes for every exercise
  seal         Maintainer: regenerate .tslings/pristine from exercises/
`);
}

function parseNum(raw: string | undefined): number | undefined {
  if (!raw || raw.startsWith("--")) return undefined;
  const m = raw.match(/(\d+)/);
  return m ? parseInt(m[1] as string, 10) : undefined;
}

function hasFlag(argv: string[], flag: string): boolean {
  return argv.includes(flag);
}

function exercisePath(meta: ExerciseMeta): string {
  return path.join(projectRoot(), "exercises", meta.dir, meta.file);
}

function exerciseRel(meta: ExerciseMeta): string {
  return ["exercises", meta.dir, meta.file].join(path.sep);
}

function printFailure(meta: ExerciseMeta, total: number, solved: number, result: CheckResult): void {
  console.log(`\n${progressBar(solved, total)}  ${bold(`Exercise ${pad(meta.n)} / ${total}: ${meta.title}`)} ${dim(`(${exerciseRel(meta)})`)}`);
  console.log(dim(`Chapter: ${meta.chapter}   Mode: ${meta.mode}`));
  if (result.stage === "guard") {
    console.log(red(`\n${result.guardReason ?? "Rejected by the guard."}`));
    if (result.guardLine !== undefined) console.log(dim(`  at line ${result.guardLine}`));
  } else if (result.stage === "type" && result.diagnostics) {
    console.log(red("\nType errors:"));
    for (const d of result.diagnostics) {
      console.log(`  ${red(formatDiagnostic(d))}`);
      if (d.frame) console.log(dim(d.frame));
    }
  } else {
    if (result.message) console.log(red(`\n${result.message}`));
    if (result.stdout) {
      console.log(dim("\n--- stdout ---"));
      console.log(result.stdout.trimEnd());
    }
    if (result.stderr) {
      console.log(dim("\n--- stderr ---"));
      const err = result.stderr.trimEnd();
      console.log(err.length > 2000 ? err.slice(0, 2000) + dim("\n…(truncated)") : err);
    }
    if (result.exitCode !== undefined && result.exitCode !== null) {
      console.log(dim(`\nexit code: ${result.exitCode}`));
    }
    if (result.timedOut) console.log(red("\nThe process timed out."));
  }
  console.log(yellow(`\nRun \`bun run hint ${meta.n}\` for a hint.`));
  console.log(dim(`Open ${exerciseRel(meta)} and fix it, then re-run.`));
}

function printSuccess(meta: ExerciseMeta): void {
  console.log(green(`✓ Exercise ${pad(meta.n)} passed: ${meta.title}`));
}

async function updateCache(meta: ExerciseMeta, ok: boolean): Promise<void> {
  try {
    const source = await Bun.file(exercisePath(meta)).text();
    await markSolved(meta.dir, hashContent(source), ok);
  } catch {
    /* cache is best-effort */
  }
}

/** Check exercises in order, stopping at the first failure. Returns exit code. */
async function startOrCheck(): Promise<number> {
  const total = EXERCISES.length;
  let solved = 0;
  for (const meta of EXERCISES) {
    const result = await checkExercise(meta);
    await updateCache(meta, result.ok);
    if (!result.ok) {
      printFailure(meta, total, solved, result);
      return 1;
    }
    solved++;
  }
  console.log(green(`\n${progressBar(total, total)}  All ${total} exercises pass. Incredible — you finished tslings!`));
  return 0;
}

async function runOne(n: number): Promise<number> {
  const meta = getExercise(n);
  if (!meta) {
    console.log(red(`No exercise numbered ${n}.`));
    return 1;
  }
  const result = await checkExercise(meta);
  await updateCache(meta, result.ok);
  if (!result.ok) {
    printFailure(meta, EXERCISES.length, 0, result);
    return 1;
  }
  printSuccess(meta);
  return 0;
}

async function firstUnsolved(): Promise<ExerciseMeta | undefined> {
  for (const meta of EXERCISES) {
    const result = await checkExercise(meta);
    await updateCache(meta, result.ok);
    if (!result.ok) return meta;
  }
  return undefined;
}

async function hint(n?: number): Promise<number> {
  const meta = n !== undefined ? getExercise(n) : await firstUnsolved();
  if (!meta) {
    console.log(green("All exercises pass. No hints needed!"));
    return 0;
  }
  if (n !== undefined && !meta) {
    console.log(red(`No exercise numbered ${n}.`));
    return 1;
  }
  console.log(cyan(`Hint for exercise ${pad(meta.n)} (${meta.title}):`));
  console.log(meta.hint);
  return 0;
}

async function list(): Promise<number> {
  const total = EXERCISES.length;
  let solvedCount = 0;
  let lastChapter = "";
  for (const meta of EXERCISES) {
    if (meta.chapter !== lastChapter) {
      lastChapter = meta.chapter;
      console.log(bold(`\n## ${meta.chapter}`));
    }
    let mark = dim("○");
    try {
      const source = await Bun.file(exercisePath(meta)).text();
      if (await cachedSolved(meta.dir, hashContent(source))) {
        mark = green("●");
        solvedCount++;
      }
    } catch {
      /* unreadable -> unsolved */
    }
    console.log(`  ${mark} ${pad(meta.n)}  ${meta.title} ${dim(`[${meta.mode}]`)}`);
  }
  console.log(`\n${progressBar(solvedCount, total)}  ${solvedCount}/${total} solved (cached — run start/check to re-verify)`);
  return 0;
}

async function confirmPrompt(question: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = (await rl.question(`${question} [y/N] `)).trim().toLowerCase();
    return answer === "y" || answer === "yes";
  } finally {
    rl.close();
  }
}

export async function resetExercise(n: number, opts: { yes: boolean }): Promise<void> {
  const meta = getExercise(n);
  if (!meta) throw new Error(`No exercise numbered ${n}.`);
  const root = projectRoot();
  const pristine = path.join(root, ".tslings", "pristine", meta.dir, meta.file);
  const target = path.join(root, "exercises", meta.dir, meta.file);
  if (!(await Bun.file(pristine).exists())) throw new Error(`No pristine copy for ${exerciseRel(meta)}. Run \`bun run seal\` first.`);
  if (!opts.yes) {
    const ok = await confirmPrompt(`Reset ${exerciseRel(meta)} to its original (broken) state, losing your edits?`);
    if (!ok) {
      console.log(dim("Reset cancelled."));
      return;
    }
  }
  await mkdir(path.dirname(target), { recursive: true });
  await Bun.write(target, Bun.file(pristine));
  await markSolved(meta.dir, hashContent(await Bun.file(target).text()), false);
  console.log(green(`Reset ${exerciseRel(meta)}.`));
}

export async function getSolutionText(n: number, yes: boolean): Promise<string> {
  if (!yes) {
    throw new Error(`Refusing to show the solution without --yes. Run \`bun run solution ${n} --yes\` if you really want the spoiler.`);
  }
  const meta = getExercise(n);
  if (!meta) throw new Error(`No exercise numbered ${n}.`);
  const p = path.join(projectRoot(), "solutions", meta.dir, meta.file);
  if (!(await Bun.file(p).exists())) throw new Error(`No solution found for ${exerciseRel(meta)}.`);
  return Bun.file(p).text();
}

async function seal(): Promise<number> {
  const root = projectRoot();
  const dest = path.join(root, ".tslings", "pristine");
  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });
  const entries = await readdir(path.join(root, "exercises"), { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    if (e.isDirectory()) {
      const files = await readdir(path.join(root, "exercises", e.name));
      await mkdir(path.join(dest, e.name), { recursive: true });
      for (const f of files) {
        if (f.endsWith(".ts")) {
          await copyFile(path.join(root, "exercises", e.name, f), path.join(dest, e.name, f));
          count++;
        }
      }
    } else if (e.isFile() && e.name.endsWith(".ts")) {
      // Legacy flat file (migrated on seal): wrap it in its own dir.
      const dir = e.name.replace(/\.ts$/, "");
      await mkdir(path.join(dest, dir), { recursive: true });
      await copyFile(path.join(root, "exercises", e.name), path.join(dest, dir, "main.ts"));
      count++;
    }
  }
  // Keep the helper directory alongside so temp-dir checks can resolve imports.
  await mkdir(path.join(dest, "_support"), { recursive: true });
  const support = await readdir(path.join(root, "exercises", "_support"));
  for (const f of support) {
    await copyFile(path.join(root, "exercises", "_support", f), path.join(dest, "_support", f));
  }
  console.log(green(`Sealed pristine copies of exercises/ into .tslings/pristine/ (${count} files).`));
  return 0;
}

interface VerifyOutcome {
  n: number;
  file: string;
  pristineFails: boolean;
  solutionPasses: boolean;
  detail: string;
}

/**
 * Maintainer check: for every exercise, the pristine copy must FAIL and the
 * solution must PASS. Runs in temp dirs; never mutates exercises/.
 */
export async function verifyAll(): Promise<{ outcomes: VerifyOutcome[]; failed: boolean }> {
  const root = projectRoot();
  const outcomes: VerifyOutcome[] = [];
  for (const meta of EXERCISES) {
    const dir = await Bun.$`mktemp -d`.text().catch(() => "");
    const workdir = dir.trim() || (await mkTempDir());
    try {
      await mkdir(path.join(workdir, "_support"), { recursive: true });
      const supportFiles = await readdir(path.join(root, "exercises", "_support"));
      for (const f of supportFiles) {
        await copyFile(path.join(root, "exercises", "_support", f), path.join(workdir, "_support", f));
      }
      const pristineSrc = path.join(root, ".tslings", "pristine", meta.dir, meta.file);
      const solSrc = path.join(root, "solutions", meta.dir, meta.file);
      if (!(await Bun.file(pristineSrc).exists())) {
        outcomes.push({ n: meta.n, file: exerciseRel(meta), pristineFails: false, solutionPasses: false, detail: "missing pristine copy (run seal)" });
        continue;
      }
      if (!(await Bun.file(solSrc).exists())) {
        outcomes.push({ n: meta.n, file: exerciseRel(meta), pristineFails: false, solutionPasses: false, detail: "missing solution" });
        continue;
      }
      const workFile = path.join(workdir, meta.dir, meta.file);
      await mkdir(path.dirname(workFile), { recursive: true });
      await copyFile(pristineSrc, workFile);
      const pristineResult = await checkExercise(meta, workFile);
      await copyFile(solSrc, workFile);
      // Bump the checker's cached snapshot: checkFile detects content change itself.
      checkFile(workFile);
      const solutionResult = await checkExercise(meta, workFile);
      const pristineFails = !pristineResult.ok;
      const solutionPasses = solutionResult.ok;
      let detail = "";
      if (!pristineFails) detail += "pristine unexpectedly PASSES; ";
      if (!solutionPasses) {
        detail += `solution FAILS at stage ${solutionResult.stage}`;
        if (solutionResult.diagnostics?.length) detail += `: ${solutionResult.diagnostics[0]?.message}`;
        if (solutionResult.message) detail += `: ${solutionResult.message}`;
      }
      outcomes.push({ n: meta.n, file: exerciseRel(meta), pristineFails, solutionPasses, detail: detail || "ok" });
    } finally {
      await rm(workdir, { recursive: true, force: true });
    }
  }
  return { outcomes, failed: outcomes.some((o) => !o.pristineFails || !o.solutionPasses) };
}

async function mkTempDir(): Promise<string> {
  const d = path.join(tmpdir(), `tslings-${Date.now()}-${Math.floor(Math.random() * 1e6)}`);
  await mkdir(d, { recursive: true });
  return d;
}

async function verify(): Promise<number> {
  const { outcomes, failed } = await verifyAll();
  for (const o of outcomes) {
    const a = o.pristineFails ? green("pristine FAILS ✓") : red("pristine PASSES ✗");
    const b = o.solutionPasses ? green("solution PASSES ✓") : red("solution FAILS ✗");
    console.log(`${pad(o.n)} ${o.file}: ${a}  ${b}${o.detail !== "ok" ? dim(` — ${o.detail}`) : ""}`);
  }
  if (failed) {
    console.log(red("\nverify: some exercises are mismatched (see above)."));
    return 1;
  }
  console.log(green(`\nverify: all ${outcomes.length} exercises OK (pristine fails, solution passes).`));
  return 0;
}

async function watchCmd(): Promise<number> {
  const { startWatch } = await import("./watch.ts");
  const checkOne = async (meta: ExerciseMeta): Promise<boolean> => {
    const result = await checkExercise(meta);
    await updateCache(meta, result.ok);
    if (result.ok) {
      printSuccess(meta);
      return true;
    }
    printFailure(meta, EXERCISES.length, 0, result);
    return false;
  };
  await startWatch({
    checkOne,
    current: firstUnsolved,
    nextAfter: async (n: number) => {
      const idx = EXERCISES.findIndex((e) => e.n === n);
      for (let i = idx + 1; i < EXERCISES.length; i++) {
        const meta = EXERCISES[i] as ExerciseMeta;
        const result = await checkExercise(meta);
        await updateCache(meta, result.ok);
        if (!result.ok) return meta;
      }
      return undefined;
    },
  });
  return 0;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const cmd = argv[0] ?? "start";
  const n = parseNum(argv[1]);
  const yes = hasFlag(argv, "--yes");

  switch (cmd) {
    case "start":
    case "check":
      process.exit(await startOrCheck());
      break;
    case "run":
      if (n === undefined) {
        console.log(red("Usage: bun run run N  (e.g. bun run run 3)"));
        process.exit(1);
      }
      process.exit(await runOne(n));
      break;
    case "watch":
      process.exit(await watchCmd());
      break;
    case "hint":
      process.exit(await hint(n));
      break;
    case "list":
      process.exit(await list());
      break;
    case "reset":
      if (n === undefined) {
        console.log(red("Usage: bun run reset N [--yes]"));
        process.exit(1);
      }
      try {
        await resetExercise(n, { yes });
        process.exit(0);
      } catch (err) {
        console.log(red(err instanceof Error ? err.message : String(err)));
        process.exit(1);
      }
      break;
    case "solution":
      if (n === undefined) {
        console.log(red("Usage: bun run solution N --yes"));
        process.exit(1);
      }
      try {
        console.log(await getSolutionText(n, yes));
        process.exit(0);
      } catch (err) {
        console.log(red(err instanceof Error ? err.message : String(err)));
        process.exit(1);
      }
      break;
    case "verify":
      process.exit(await verify());
      break;
    case "seal":
      process.exit(await seal());
      break;
    case "help":
    case "--help":
    case "-h":
      usage();
      process.exit(0);
      break;
    default:
      console.log(red(`Unknown command: ${cmd}\n`));
      usage();
      process.exit(1);
  }
}

if (import.meta.main) {
  await main();
}
