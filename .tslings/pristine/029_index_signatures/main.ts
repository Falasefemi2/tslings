// 029_index_signatures.ts — Index signatures
//
// `{ [k: string]: number }` describes a dictionary: any string key maps to
// a number. But with `noUncheckedIndexedAccess`, reading `counts["a"]` has
// type `number | undefined`, because the key might be absent. Assigning that
// straight into a `number` does not compile — the `undefined` case needs an
// explicit fallback before the value can be used as a plain number.
//
// Can you find the problem?

const counts: ___ = { a: 2 };

const n: number = counts["a"];
console.log(n);

export {};
