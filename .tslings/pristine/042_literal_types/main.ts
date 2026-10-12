// 042_literal_types.ts — Literal types
//
// A string variable holds any string, but a string *literal* type like
// "GET" holds exactly one value. Unions of literals (`"GET" | "POST"`)
// describe a fixed menu of allowed values, so a typo like "get" or "DELETE"
// fails before the request ever leaves your machine.
//
// Can you find the problem? The method parameter accepts anything right now.

import type { Equal, Expect } from "../_support/types";

function req(method: ___): string {
  return method;
}

type _Check = Expect<Equal<Parameters<typeof req>[0], "GET" | "POST">>;

console.log(req("GET"));
