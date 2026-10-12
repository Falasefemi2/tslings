// 055_mapped.ts — Mapped types
//
// Types can be computed, not just declared: this chapter is the comptime
// analog, where the "program" runs inside the compiler. A mapped type loops
// over every key of an object type and rebuilds it, transforming each
// property as it goes — one definition covers every shape you feed it.
//
// Can you find the problem? The alias below should build the type, but it
// does not say what to build yet.

import type { Equal, Expect } from "../_support/types";

type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type T1 = Expect<Equal<MyReadonly<{ a: string }>, { readonly a: string }>>;
type T2 = Expect<
  Equal<MyReadonly<{ a: string; b: number }>, { readonly a: string; readonly b: number }>
>;
