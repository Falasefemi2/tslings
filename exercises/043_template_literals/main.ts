// 043_template_literals.ts — Template literal types
//
// Template literal *types* bring string interpolation to the type level:
// `user:${number}` matches "user:1" and "user:42", but not "user:abc" or
// "admin:42". The placeholder can be any type — `number`, a literal union,
// even another template — and the compiler checks the shape for you.
//
// Can you find the problem? The key below should only allow user ids.

import type { Equal, Expect } from "../_support/types";

type Key = `user:${___}`;

type _Check = Expect<Equal<Key, `user:${number}`>>;

const k: Key = "user:42";
console.log(k);
