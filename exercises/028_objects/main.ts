// 028_objects.ts — Object types
//
// An object type lists each property and its type: `{ name: string;
// age: number }`. The annotation is checked against the value, so a missing
// property or one of the wrong type fails right here at the declaration,
// instead of surfacing later as a confusing error at some distant use site.
//
// Can you find the problem?

const user: ___ = { name: "Ada", age: 30 };

console.log(`${user.name}:${user.age}`);

export {};
