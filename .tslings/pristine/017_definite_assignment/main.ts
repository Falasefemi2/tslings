// 017_definite_assignment.ts — Definite assignment
//
// Strict mode tracks whether a variable definitely holds a value before
// each use. Declaring `let total: number;` reserves the name but assigns
// nothing, so `total += 5` reads a value that was never written. Every
// declaration needs an initial value on the path to its first read.
//
// Can you find the problem?

let total: number = ___;

total += 5;
total += 10;

const done: number = total;

export {};
