// 040_type_predicates.ts — Type predicates
//
// `Array.filter` keeps its element type unless the callback is a type
// predicate: a return type written `v is number` instead of `boolean`.
// The predicate's runtime check (`typeof v === "number"`) becomes a fact
// the compiler trusts, so the filtered array comes out as `number[]`.
//
// Can you find the problem? The callback knows the answer but can't prove it.

function isNum(v: unknown): ___ {
  return typeof v === "number";
}

const mixed: unknown[] = [1, "a", 3, "b", 5];
const ns: number[] = mixed.filter(isNum);

console.log(ns.join(","));

export {};
