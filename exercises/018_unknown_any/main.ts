// 018_unknown_any.ts — unknown vs any
//
// `any` switches the type-checker off; `unknown` keeps it on. An
// `unknown` value cannot be assigned or used until you narrow it with a
// runtime check such as `typeof`. That one extra branch is the whole
// difference between "hope it is a number" and "proved it is a number".
//
// Can you find the problem?

function parse(s: string): unknown {
  return JSON.parse(s);
}

const value: unknown = parse("42");

const n: number = ___;

console.log(n);

export {};
