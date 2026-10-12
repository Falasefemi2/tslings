// 095_bun_test.ts — bun:test
//
// Bun ships a test runner: import `test` and `expect` from "bun:test",
// group checks into named test blocks, and run them with `bun test`.
// Each test should assert one behavior so failures point at the cause.
//
// Can you find the problem?

import { test, expect } from "bun:test";

function add(a: number, b: number): number {
  return a + b;
}

test("adds", () => {
  const wanted: ___ = 3;
  expect(add(1, 2)).toBe(wanted);
});

test("types", () => {
  const w: number = 3;
  expect(w).toBe(3);
});

export {};
