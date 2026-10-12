// 062_pick.ts — Reimplementing Pick
//
// `Pick<T, K>` keeps only the listed keys — but there is no compiler magic
// involved. Mapping `P in K` instead of `P in keyof T` walks just the chosen
// subset, and an indexed access reads each survivor's original type back out
// of `T`. A small library type, rebuilt from two smaller ideas.
//
// Can you find the problem? The rebuilt version drops information.

import type { Equal, Expect } from "../_support/types";

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

interface Todo {
  title: string;
  done: boolean;
  priority: number;
}

type T1 = Expect<Equal<MyPick<Todo, "title" | "done">, Pick<Todo, "title" | "done">>>;
type T2 = Expect<Equal<MyPick<Todo, "priority">, { priority: number }>>;
type T3 = Expect<Equal<MyPick<Todo, never>, {}>>;
