// 059_infer.ts — infer
//
// Sometimes you must reach inside a type and pull a piece out. The `infer`
// keyword declares a fresh type variable right where the piece sits — inside
// a function parameter, an array element, a promise payload — and the true
// branch can then use that name. It only ever appears in the `extends`
// position of a conditional type.
//
// Can you find the problem? The pattern below captures nothing yet.

import type { Equal, Expect } from "../_support/types";

type FirstArg<F> = F extends (first: ___, ...rest: never[]) => unknown ? A : never;

type T1 = Expect<Equal<FirstArg<(a: string, b: number) => void>, string>>;
type T2 = Expect<Equal<FirstArg<(name: string) => number>, string>>;
type T3 = Expect<Equal<FirstArg<number>, never>>;
