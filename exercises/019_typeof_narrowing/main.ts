// 019_typeof_narrowing.ts — typeof narrowing
//
// A `typeof` check narrows a union: inside `if (typeof v === "string")`
// the compiler treats `v` as a string, and past the branch it knows the
// other members remain. Each branch sees only the narrowed type, so the
// wrong operation in the wrong branch is caught immediately.
//
// Can you find the problem?

function describe(v: string | number): string {
  if (typeof v === "string") {
    return "str:" + ___;
  }
  return "num:" + v;
}

console.log(describe("hi"));
console.log(describe(3));

export {};
