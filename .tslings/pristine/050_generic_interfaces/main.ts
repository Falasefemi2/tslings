// 050_generic_interfaces.ts — Generic interfaces
//
// An interface becomes reusable across payload types by taking a type
// parameter: `Result<number>` carries a number, `Result<string>` a string.
// The `value` field is optional, so readers must narrow away `undefined`
// before use — strict mode won't let you print it blindly.
//
// Can you find the problem? Fill in the ___ blank.

interface Result<T> {
  ok: boolean;
  value?: T;
}

const r: Result<___> = { ok: true, value: 7 };

console.log(r.ok && r.value !== undefined ? `ok:${r.value}` : "bad");

export {};
