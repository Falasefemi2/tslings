// 058_distribution.ts — Distributive conditionals
//
// When the checked type is a naked type parameter, a conditional distributes:
// applied to a union, it runs once per member and unions the outcomes. Wrap
// the parameter as `[T] extends [X]` and the union is tested whole instead —
// one question, one answer, no splitting.
//
// Can you find the problem? One branch below is missing its answer.

import type { Equal, Expect } from "../_support/types";

type ToArray<T> = T extends unknown ? ___ : never;

type ToArrayWhole<T> = [T] extends [unknown] ? T[] : never;

type T1 = Expect<Equal<ToArray<string | number>, string[] | number[]>>;
type T2 = Expect<Equal<ToArray<string>, string[]>>;
type T3 = Expect<Equal<ToArrayWhole<string | number>, (string | number)[]>>;
