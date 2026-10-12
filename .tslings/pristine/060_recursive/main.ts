// 060_recursive.ts — Recursive types
//
// A type alias may mention itself, just like a recursive function calls
// itself: handle one layer now, and let the recursion handle the rest. The
// conditional picks the base case (a primitive is already done) while the
// mapped type rebuilds the current layer and recurses into each property.
//
// Can you find the problem? The recursion below never reaches deeper.

import type { Equal, Expect } from "../_support/types";

type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: ___ } : T;

interface Profile {
  name: string;
  address: { city: string; zip: string };
}

type T1 = Expect<
  Equal<
    DeepReadonly<Profile>,
    { readonly name: string; readonly address: { readonly city: string; readonly zip: string } }
  >
>;
type T2 = Expect<Equal<DeepReadonly<string>, string>>;
type T3 = Expect<Equal<DeepReadonly<{ a: number }>, { readonly a: number }>>;
