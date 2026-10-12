// 041_assertion_functions.ts — Assertion functions
//
// An assertion function returns nothing and instead promises a fact: the
// return type `asserts v is string` means "if this returns, v is a string".
// The compiler applies that fact to every line after the call — no manual
// cast needed. If the check fails, the function throws instead of returning.
//
// Can you find the problem? The assertion below proves nothing yet.

function assertStr(v: unknown): ___ {
  if (typeof v !== "string") {
    throw new Error("nope");
  }
}

const maybe: unknown = "hello";
assertStr(maybe);
console.log(`ok:${maybe.length}`);

export {};
