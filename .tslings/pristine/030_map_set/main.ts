// 030_map_set.ts — Map and Set
//
// A `Map` stores key/value pairs; `get` returns `V | undefined` because the
// key might be missing, so the result needs a fallback before it can live
// in a plain `number`. A `Set` stores unique values and answers membership
// questions with `has`. Both take their key and value types as parameters.
//
// Can you find the problem?

const m = new Map<string, number>([["a", 2]]);
const seen = new Set<string>(["a"]);

const n: number = ___;

console.log(seen.has("a") ? n : 0);

export {};
