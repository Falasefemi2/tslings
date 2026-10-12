// 006_functions.ts — Function types
//
// A function annotation has two halves: the parameter types and the return
// type. `function square(n: number): number` promises a number in and a
// number out. If the body returns something else, or a caller passes the
// wrong thing, you hear about it before the program ever runs.
//
// Can you find the problem? Both halves of the annotation are missing.

function square(n: ___): ___ {
  return n * n;
}

console.log(square(3));

export {};
