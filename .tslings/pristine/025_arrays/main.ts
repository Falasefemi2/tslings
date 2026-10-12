// 025_arrays.ts — Arrays
//
// An array type names its element type followed by `[]`: `number[]` holds
// only numbers. Annotating the declaration pins the contract up front, so a
// stray element of the wrong type is caught here instead of somewhere far
// away where the array is consumed. The loop below adds every element up.
//
// Can you find the problem?

const xs: ___ = [1, 2, 3];

let total = 0;
for (const x of xs) {
  total += x;
}
console.log(total);

export {};
