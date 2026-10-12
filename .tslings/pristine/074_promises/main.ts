// 074_promises.ts — Promises
//
// A Promise is a value that arrives later. `Promise.resolve(42)` builds one
// that is already fulfilled with 42. A function that hands you a promise
// must say so in its return type, otherwise callers cannot `.then` it.
// The return-type annotation below is missing.
//
// Can you find the problem? Fill in the ___ blank.

function answer(): ___ {
  return Promise.resolve(42);
}

answer().then((v) => console.log(v));

export {};
