import { describe, expect, test } from "bun:test";
import path from "node:path";
import { getSolutionText, resetExercise } from "../src/cli.ts";

const ROOT = path.resolve(import.meta.dir, "..");

describe("reset", () => {
  test("restores the pristine content", async () => {
    const target = path.join(ROOT, "exercises", "001_hello", "main.ts");
    const pristine = path.join(ROOT, ".tslings", "pristine", "001_hello", "main.ts");
    const backup = await Bun.file(target).text();
    try {
      await Bun.write(target, "// intentionally broken by the test\n");
      await resetExercise(1, { yes: true });
      expect(await Bun.file(target).text()).toBe(await Bun.file(pristine).text());
    } finally {
      await Bun.write(target, backup);
    }
  });
});

describe("solution", () => {
  test("refuses without --yes", async () => {
    await expect(getSolutionText(1, false)).rejects.toThrow(/--yes/);
  });

  test("prints the reference solution with --yes", async () => {
    expect(await getSolutionText(1, true)).toContain("Hello, tslings!");
  });
});
