// 002_const_let.ts — const vs let
//
// `const` means the binding can never be reassigned; `let` means it can.
// TypeScript (and Bun at runtime) both reject reassigning a `const`.
// Prefer `const` by default, and reach for `let` only when the value
// genuinely changes over time.
//
// Can you find the problem? This counter is incremented below, so one
// keyword has to change.

let counter = 10;
counter += 1;
console.log(counter);

export {};
