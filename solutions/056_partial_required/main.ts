// 056_partial_required.ts — Reimplementing Partial
//
// `Partial<T>` and `Required<T>` are not magic: each is a mapped type with a
// small modifier on the `?` marker. Adding `?` makes every property optional,
// while `-?` strips optionality away, demanding every property back. The
// right-hand side decides what each property becomes.
//
// Can you spot what is missing from the two aliases below?

import type { Equal, Expect } from "../_support/types";

type MyPartial<T> = { [K in keyof T]?: T[K] };

type MyRequired<T> = { [K in keyof T]-?: T[K] };

type T1 = Expect<Equal<MyPartial<{ a: string; b: number }>, Partial<{ a: string; b: number }>>>;
type T2 = Expect<Equal<MyPartial<{ a: string }>, { a?: string }>>;
type T3 = Expect<Equal<MyRequired<{ a?: string; b?: number }>, Required<{ a?: string; b?: number }>>>;
type T4 = Expect<Equal<MyRequired<{ a?: string }>, { a: string }>>;
