// 064_awaited.ts — Reimplementing Awaited
//
// `await` unwraps as many promise layers as it finds, and the `Awaited`
// helper models that at the type level: peel one `Promise` layer, then
// repeat on what falls out until no promise remains. Peeling plus
// self-reference turns arbitrary nesting into the final value type.
//
// Can you find the problem? The unwrapping below cannot name its payload.

import type { Equal, Expect } from "../_support/types";

type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

type T1 = Expect<Equal<MyAwaited<Promise<Promise<number>>>, number>>;
type T2 = Expect<Equal<MyAwaited<Promise<string>>, string>>;
type T3 = Expect<Equal<MyAwaited<number>, number>>;
