// 054_identity_constraints.ts — Writing generic utilities
//
// Real-world generics combine every trick in this chapter: `pluck` works
// on any element type `T`, takes any key `K` of that element, and returns
// an array of whatever that property holds. `xs.map((x) => x[k])` pulls
// one column out of a table of rows. The return annotation went missing.
//
// Can you find the problem? Fill in the ___ blank.

function pluck<T, K extends keyof T>(xs: T[], k: K): ___ {
  return xs.map((x) => x[k]);
}

console.log(pluck([{ n: 5 }], "n").join(","));

export {};
