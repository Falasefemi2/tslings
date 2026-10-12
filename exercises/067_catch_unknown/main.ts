// 067_catch_unknown.ts — catch is unknown
//
// Under strict mode, a `catch` variable is `unknown`, not `any`.
// This chapter treats errors as values you must narrow, the same
// way unions forced you to narrow before touching a field.
// `unknown` lets any value be thrown, but none be read without proof.
//
// Can you find the problem?
try {
  throw new Error("boom");
} catch (e) {
  console.log("caught: " + ___);
}

export {};
