// 007_default_params.ts — Default parameters
//
// A parameter with a default (`name: string = "world"`) may be omitted by
// the caller. Without a default, skipping the argument is a type error —
// the callee would see `undefined` where it promised a `string`.
//
// Can you find the problem? One call below passes no argument.

function greet(name: string = "world"): string {
  return `Hello, ${name}!`;
}

console.log(greet());
console.log(greet("Ada"));

export {};
