// 032_spread.ts — Spread
//
// Spread (`...`) splices one array's elements into another: `[...a, ...b]`
// builds a fresh array holding every element of both. The result keeps the
// element type, so spreading a `string[]` into a `number[]` slot is caught
// immediately. Nothing is mutated — both inputs stay exactly as they were.
//
// Can you find the problem?

const a = [1, 2];
const b = [3, 4];

const c: number[] = [...a, ...___];

console.log(c.join(","));

export {};
