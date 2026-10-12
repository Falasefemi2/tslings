import { describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { checkExercise } from "../src/runner.ts";
import type { ExerciseMeta } from "../src/manifest.ts";

function meta(over: Partial<ExerciseMeta> = {}): ExerciseMeta {
  return { n: 0, dir: "fixture", file: "main.ts", title: "t", chapter: "c", mode: "run", hint: "h", ...over };
}

async function fixture(source: string): Promise<{ dir: string; file: string }> {
  const dir = await mkdtemp(path.join(tmpdir(), "tslings-"));
  const file = path.join(dir, "main.ts");
  await Bun.write(file, source);
  return { dir, file };
}

describe("runner", () => {
  test("timeout is enforced on an infinite loop", async () => {
    const { dir, file } = await fixture("while (true) {}\nexport {};\n");
    try {
      const r = await checkExercise(meta({ mode: "run", timeoutMs: 500 }), file);
      expect(r.ok).toBe(false);
      expect(r.timedOut).toBe(true);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 10000);

  test("stdout mismatch fails", async () => {
    const { dir, file } = await fixture('console.log("wrong");\nexport {};\n');
    try {
      const r = await checkExercise(meta({ mode: "run", expectedStdout: "right" }), file);
      expect(r.ok).toBe(false);
      expect(r.stage).toBe("runtime");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("non-zero exit fails", async () => {
    const { dir, file } = await fixture("process.exit(3);\nexport {};\n");
    try {
      const r = await checkExercise(meta({ mode: "run" }), file);
      expect(r.ok).toBe(false);
      expect(r.exitCode).toBe(3);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("a passing run fixture passes", async () => {
    const { dir, file } = await fixture('console.log("hi");\nexport {};\n');
    try {
      const r = await checkExercise(meta({ mode: "run", expectedStdout: "hi" }), file);
      expect(r.ok).toBe(true);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
