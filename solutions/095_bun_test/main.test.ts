import { test, expect } from "bun:test";

function add(a: number, b: number): number {
  return a + b;
}

test("adds", () => {
  const wanted: number = 3;
  expect(add(1, 2)).toBe(wanted);
});

test("types", () => {
  const w: number = 3;
  expect(w).toBe(3);
});

export {};
