// 031_destructuring.ts — Destructuring
//
// Destructuring unpacks an object into locals: `const { name, age } = user`
// pulls out both properties in one move. You can annotate the pattern with
// the object's shape, and then a missing or mistyped property is caught at
// the unpacking site rather than at some later use of the new variables.
//
// Can you find the problem?

const user = { name: "Ada", age: 30 };

const { name, age }: ___ = user;

console.log(`${name} ${age}`);

export {};
