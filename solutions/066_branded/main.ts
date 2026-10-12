// 066_branded.ts — Branded types
//
// TypeScript stops at structure: any string passes where a string is asked,
// even a user id where an order id belongs. Intersecting with a phantom
// marker field — one that exists only in the type, never at runtime — gives
// each flavor a distinct identity while keeping every string operation
// available. A cast is how values enter the branded world.
//
// Can you find the problem? The marker below is missing.

import type { Equal, Expect } from "../_support/types";

type UserId = string & { readonly __brand: "UserId" };

type T1 = Expect<Equal<UserId, string & { readonly __brand: "UserId" }>>;

declare const raw: string;

const mine: UserId = raw as UserId;

const backToString: string = mine;

function greet(id: UserId): string {
  return `hello, ${id}`;
}

greet(mine);
