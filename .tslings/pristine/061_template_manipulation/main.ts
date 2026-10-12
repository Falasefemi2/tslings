// 061_template_manipulation.ts — Template literal manipulation
//
// Template placeholders accept more than values: put a whole string type in
// `${...}` and the compiler concatenates at the type level. Combined with
// the built-in helpers that remap letter case, you can derive new literal
// types — event names from `"click"`, shouts from whispers — without writing
// each one out by hand.
//
// Can you find the problem? Both derivations below are incomplete.

import type { Equal, Expect } from "../_support/types";

type Shout<S extends string> = ___;

type EventName<T extends string> = `on${___}`;

type T1 = Expect<Equal<Shout<"hi">, "HI">>;
type T2 = Expect<Equal<Shout<"Hello, World!">, "HELLO, WORLD!">>;
type T3 = Expect<Equal<EventName<"click">, "onClick">>;
type T4 = Expect<Equal<EventName<"keydown">, "onKeydown">>;
