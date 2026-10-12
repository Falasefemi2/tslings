// 013_strict_null.ts — Strict null checks
//
// With `strict` on, `string` and `null` are different types: a value of
// type `string | null` cannot be used as a plain string. The compiler
// forces you to handle the missing case on purpose — with `??`, an `if`
// check, or a similar guard — instead of crashing on it by accident.
//
// Can you find the problem?

function greet(name: string | null): string {
  return ___;
}

console.log(greet(null));

export {};
