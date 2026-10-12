// 026_tuples.ts — Tuples
//
// A tuple is an array with a fixed length and a fixed type per position:
// `[string, number]` means index 0 is a string and index 1 is a number.
// Unlike `string[]`, a tuple remembers which slot holds what, so swapping
// the order or adding an extra element is a compile-time error.
//
// Can you find the problem?

const user: ___ = ["ada", 30];

console.log(`${user[0]}:${user[1]}`);

export {};
