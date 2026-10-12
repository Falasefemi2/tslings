// 065_variadic_tuples.ts — Variadic tuple types
//
// Tuples can be taken apart with the same rest syntax you use on values: a
// pattern like `[infer H, ...rest]` names the head and gathers the tail.
// When the tuple is empty nothing matches, so the false branch decides what
// "no first element" means — usually `never`.
//
// Can you find the problem? The tail below has no type to gather into.

import type { Equal, Expect } from "../_support/types";

type First<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never;

type T1 = Expect<Equal<First<[1, 2, 3]>, 1>>;
type T2 = Expect<Equal<First<[]>, never>>;
type T3 = Expect<Equal<First<["a", true]>, "a">>;
