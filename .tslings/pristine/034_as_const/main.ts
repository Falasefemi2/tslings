// 034_as_const.ts — as const
//
// A `const` array like `["GET", "POST"]` widens to `string[]`, forgetting
// its exact members. Appending `as const` freezes it into a readonly tuple
// of literal types, so `(typeof METHODS)[number]` becomes the precise union
// `"GET" | "POST"` instead of the shapeless `string`. The check below pins
// that union down: it only compiles when the literal types survive.
//
// Can you find the problem?

import type { Equal, Expect } from "../_support/types";

const METHODS = ___;

type M = (typeof METHODS)[number];
type Check = Expect<Equal<M, "GET" | "POST">>;

const m: M = "GET";
console.log(m);

export {};
