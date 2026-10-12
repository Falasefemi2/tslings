// 048_defaults.ts — Default type arguments
//
// Type parameters can have defaults, just like function parameters do.
// Writing `Pair<string>` leaves the second argument out, so the default
// kicks in — and the tuple below should still type-check. The default
// itself went missing.
//
// Can you find the problem? Fill in the ___ blank.

type Pair<T, U = ___> = [T, U];

const p: Pair<string> = ["a", 1];

console.log(p.join(","));

export {};
