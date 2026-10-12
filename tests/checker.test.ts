import { describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { checkFile } from "../src/checker.ts";
import { checkGuard } from "../src/guard.ts";
import type { ExerciseMeta } from "../src/manifest.ts";

function meta(over: Partial<ExerciseMeta> = {}): ExerciseMeta {
  return { n: 0, dir: "fixture", file: "main.ts", title: "t", chapter: "c", mode: "run", hint: "h", ...over };
}

describe("checker", () => {
  test("reports the right line and column for a known type error", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tslings-"));
    try {
      const f = path.join(dir, "bad.ts");
      await Bun.write(f, 'const x: number = "nope";\n');
      const diags = checkFile(f);
      expect(diags.length).toBeGreaterThan(0);
      const d = diags[0];
      expect(d).toBeDefined();
      expect(d!.line).toBe(1);
      // TS2322 is reported on the declared name `x` (col 7), not the initializer.
      expect(d!.col).toBe(7);
      expect(String(d!.code)).toContain("2322");
      expect(d!.frame).toContain("^");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("a clean file has no diagnostics", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tslings-"));
    try {
      const f = path.join(dir, "good.ts");
      await Bun.write(f, "const x: number = 1;\nexport {};\n");
      expect(checkFile(f)).toEqual([]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("guard", () => {
  test("rejects @ts-ignore and @ts-nocheck", () => {
    expect(checkGuard("// @ts-ignore\nconst x = 1;", meta())).not.toBeNull();
    expect(checkGuard("// @ts-nocheck\nconst x = 1;", meta())).not.toBeNull();
  });

  test("rejects @ts-expect-error unless the manifest allows it", () => {
    const src = "// @ts-expect-error\nconst x = 1;";
    expect(checkGuard(src, meta())).not.toBeNull();
    expect(checkGuard(src, meta({ allow: ["@ts-expect-error"] }))).toBeNull();
  });

  test("rejects any when forbidden (AST, not regex)", () => {
    const m = meta({ forbid: ["any"] });
    expect(checkGuard("const x: any = 1;", m)).not.toBeNull();
    expect(checkGuard("const x = 1 as any;", m)).not.toBeNull();
    expect(checkGuard("const x = 1 as unknown as any;", m)).not.toBeNull();
    // `any` inside a comment is not code.
    expect(checkGuard("// any is banned here\nconst x: number = 1;", m)).toBeNull();
  });
});
