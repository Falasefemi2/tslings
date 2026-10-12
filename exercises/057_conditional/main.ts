// 057_conditional.ts — Conditional types
//
// A conditional type asks the compiler a yes-or-no question: does `T` fit
// inside some other type? `T extends X ? A : B` picks a branch the way an
// `if` picks a path at runtime — except the "value" being tested is a type,
// and the result is a type too. Literals count as fitting inside the wider
// type they belong to.
//
// Can you find the problem? The question below is unfinished.

import type { Equal, Expect } from "../_support/types";

type IsString<T> = T extends ___ ? true : false;

type T1 = Expect<Equal<IsString<string>, true>>;
type T2 = Expect<Equal<IsString<number>, false>>;
type T3 = Expect<Equal<IsString<"hello">, true>>;
type T4 = Expect<Equal<IsString<boolean>, false>>;
