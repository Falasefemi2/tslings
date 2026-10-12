import { describe, expect, test } from "bun:test";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { CHAPTERS, EXERCISES } from "../src/manifest.ts";

const ROOT = path.resolve(import.meta.dir, "..");

async function dirNames(parent: string): Promise<string[]> {
  const entries = await readdir(path.join(ROOT, parent), { withFileTypes: true });
  return entries
    .filter((d) => d.isDirectory() && d.name !== "_support")
    .map((d) => d.name)
    .sort();
}

describe("manifest integrity", () => {
  test("numbers are unique and sequential from 1", () => {
    const ns = EXERCISES.map((e) => e.n);
    expect(new Set(ns).size).toBe(ns.length);
    ns.forEach((n, i) => expect(n).toBe(i + 1));
  });

  test("exercise dirs, entry files and solutions exist; modes are valid", async () => {
    for (const e of EXERCISES) {
      expect(["compile", "run", "test"]).toContain(e.mode);
      expect(e.file).toBe(e.mode === "test" ? "main.test.ts" : "main.ts");
      expect(await Bun.file(path.join(ROOT, "exercises", e.dir, e.file)).exists()).toBe(true);
      expect(await Bun.file(path.join(ROOT, "solutions", e.dir, e.file)).exists()).toBe(true);
      expect(e.title.length).toBeGreaterThan(0);
      expect(e.hint.length).toBeGreaterThan(0);
    }
  });

  test("no orphan exercise or solution dirs", async () => {
    expect(await dirNames("exercises")).toEqual(EXERCISES.map((e) => e.dir));
    expect(await dirNames("solutions")).toEqual(EXERCISES.map((e) => e.dir));
  });

  test("pristine copies mirror the manifest", async () => {
    expect(await dirNames(path.join(".tslings", "pristine"))).toEqual(EXERCISES.map((e) => e.dir));
    for (const e of EXERCISES) {
      expect(await Bun.file(path.join(ROOT, ".tslings", "pristine", e.dir, e.file)).exists()).toBe(true);
    }
  });

  test("chapters are contiguous and follow CHAPTERS order", () => {
    const seen: string[] = [];
    for (const e of EXERCISES) {
      if (seen[seen.length - 1] !== e.chapter) {
        expect(seen).not.toContain(e.chapter);
        seen.push(e.chapter);
      }
    }
    expect(seen).toEqual(CHAPTERS);
  });

  test("mode fields are consistent", () => {
    for (const e of EXERCISES) {
      if (e.mode === "run") expect(typeof e.expectedStdout).toBe("string");
      if (e.mode === "test") expect(typeof e.expectedTests).toBe("number");
      for (const arr of [e.forbid, e.allow]) {
        if (arr !== undefined) expect(Array.isArray(arr)).toBe(true);
      }
    }
  });
});
