// 063_omit.ts — Reimplementing Omit
//
// `Omit<T, K>` is `Pick`'s mirror: instead of listing the keys to keep, you
// list the keys to drop, and `Exclude` subtracts them from the key set. The
// constraint on `K` keeps the dropped keys honest — only keys that really
// exist on the object may be named.
//
// Can you find the problem? One piece of the constraint went missing.

import type { Equal, Expect } from "../_support/types";

type MyOmit<T, K extends keyof ___> = { [P in Exclude<keyof T, K>]: T[P] };

interface Todo {
  title: string;
  done: boolean;
  priority: number;
}

type T1 = Expect<Equal<MyOmit<Todo, "done">, Omit<Todo, "done">>>;
type T2 = Expect<Equal<MyOmit<Todo, "title" | "priority">, { done: boolean }>>;
