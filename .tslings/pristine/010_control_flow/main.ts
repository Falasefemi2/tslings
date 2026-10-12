// 010_control_flow.ts — Control flow
//
// A function promising `: string` must deliver a string on every path.
// TypeScript follows your `if`/`else` branches and flags the ones that fall
// off the end. When callers only exercise one path, the type-checker still
// holds you accountable for all of them.
//
// Can you find the problem? One branch returns something that is not a string.

function sign(n: number): string {
  if (n > 0) {
    return "positive";
  } else if (n < 0) {
    return ___;
  }
  return "zero";
}

console.log(sign(42));

export {};
