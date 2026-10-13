// 008_rest_params.ts — Rest parameters
//
// `...nums: number[]` gathers any number of trailing arguments into an
// array. The annotation describes the array's element type, not each
// argument separately: one `number[]` covers zero, one, or fifty numbers.
//
// Can you find the problem? The rest parameter's element type is missing.

function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3));

export {};
