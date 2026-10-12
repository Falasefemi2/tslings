import type { Equal, Expect } from "../_support/types";

const METHODS = ["GET", "POST"] as const;

type M = (typeof METHODS)[number];
type Check = Expect<Equal<M, "GET" | "POST">>;

const m: M = "GET";
console.log(m);

export {};
