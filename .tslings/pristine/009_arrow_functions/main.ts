// 009_arrow_functions.ts — Arrow functions
//
// Arrows are the idiomatic way to write small function values: callbacks,
// mappers, reducers. Their parameters still need types wherever inference
// cannot figure them out — a bare `(a, b) => a + b` leaves both as implicit
// `any`, which strict mode forbids.
//
// Can you find the problem? The parameters have no types.

const add = (a: ___, b: ___): number => a + b;

console.log(add(3, 5));

export {};
