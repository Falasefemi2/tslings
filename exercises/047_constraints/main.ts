// 047_constraints.ts — Constraints
//
// A bare `<T>` accepts literally anything — including values with no
// `.length` at all. An `extends` constraint narrows what callers may pass,
// so the body can safely use the members the constraint promises. Without
// it, the compiler stops you from touching `.length` on an unknown `T`.
//
// Can you find the problem? Fill in the ___ blank.

function longest<T extends ___>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("ab", "abc").length);

export {};
