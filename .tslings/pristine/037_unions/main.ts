// 037_unions.ts — Unions
//
// A union type means "this OR that". `string | unknown[]` accepts either a
// string or an array of unknowns. Both happen to have a `.length` property,
// so one function can measure either — but annotate the parameter with only
// one side and the other caller stops compiling.
//
// Can you find the problem? What single annotation covers both calls below?

function len(v: ___): number {
  return v.length;
}

console.log(len("abcdefg"));
console.log(len([1, 2]));

export {};
