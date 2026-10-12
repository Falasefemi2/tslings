// 045_never_assignment.ts — The never type
//
// `never` is the type with no values: nothing can be assigned to it except
// an expression that never produces a value — like a call to a function
// that always throws. That makes `never` the perfect "impossible" marker:
// a variable typed `never` can only hold the result of something like `fail()`.
//
// Can you find the problem? Only one kind of expression fits in a `never`.

import type { Equal, Expect } from "../_support/types";

function fail(msg: string): never {
  throw new Error(msg);
}

const n: never = ___;

type _Check = Expect<Equal<typeof n, never>>;
