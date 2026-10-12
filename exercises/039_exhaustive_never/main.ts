// 039_exhaustive_never.ts — Exhaustive checks with never
//
// When every member of a union has been handled, the leftover has type
// `never` — the type with no values. Assigning the remainder to a `never`
// const proves no case was forgotten: add a union member later and this line
// starts erroring until you handle it.
//
// Can you find the problem? One member of S has no case below.

import type { Equal, Expect } from "../_support/types";

type S = "a" | "b" | "c";

function f(s: S): number {
  switch (s) {
    case "a":
      return 1;
    case "b":
      return 2;
    case ___:
      return 3;
    default: {
      const exhaustive: never = s;
      return exhaustive;
    }
  }
}

type _Check = Expect<Equal<ReturnType<typeof f>, number>>;
