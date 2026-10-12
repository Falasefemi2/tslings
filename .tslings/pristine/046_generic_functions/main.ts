// 046_generic_functions.ts — Generic functions
//
// A generic function works for many types at once: the `<T>` declares a
// type parameter, a placeholder the *caller* fills in. Inside the body,
// `T` stands for "whatever type was passed in". The annotation on the
// value below forgot to use the placeholder, so the pieces don't connect.
//
// Can you find the problem? Fill in the ___ blank.

function wrap<T>(v: ___): T[] {
  return [v];
}

console.log(wrap(42).join(","));

export {};
