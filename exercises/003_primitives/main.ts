// 003_primitives.ts — Primitive types
//
// TypeScript's primitive types are `string`, `number`, `boolean`, `bigint`,
// `symbol`, `null`, and `undefined`. Annotating a function's parameters and
// return type tells the compiler exactly what is allowed in and out — and
// wrong arguments become red squiggles instead of runtime surprises.
//
// Can you find the problem? The annotations below are missing.

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(12, 18));

export {};
