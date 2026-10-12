// 052_keyof.ts — keyof
//
// `keyof O` is the union of `O`'s property names as literal types. By
// tying the key parameter to `K extends keyof O`, `get` only accepts real
// keys — and the return type `O[K]` becomes the exact type of whichever
// property was asked for. The key parameter below lost that connection.
//
// Can you find the problem? Fill in the ___ blank.

function get<O, K extends keyof O>(o: O, k: ___): O[K] {
  return o[k];
}

console.log(get({ name: "Ada" }, "name"));

export {};
