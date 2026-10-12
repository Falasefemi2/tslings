// 011_loops.ts — Loops
//
// A `for...of` loop walks every element of an array, binding each one to
// the loop variable in turn. The accumulator must start at a known value
// before the loop runs, or the first `+=` has nothing to build on.
// Adding 1 + 2 + 3 + 4 + 5 should print 15.
//
// Can you find the problem?

const nums: number[] = [1, 2, 3, 4, 5];

let total: number = 0;

for (const n of ___) {
  total += n;
}

console.log(total);

export {};
