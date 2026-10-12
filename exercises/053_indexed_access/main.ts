// 053_indexed_access.ts — Indexed access
//
// `User["name"]` looks up the type of one property: it evaluates to
// `string`. Indexed access lets you name the type of a field without
// repeating it, so aliases stay in sync when `User` itself changes.
// This is a `compile`-mode exercise: it passes when it type-checks cleanly.
// There is nothing to run. Can you find the problem?

interface User {
  name: string;
  age: number;
}

type Name = User[___];

function getAge(u: User): number {
  return u.age;
}

const n: Name = "Ada";
const s: string = n;

console.log(getAge({ name: "Ada", age: 36 }), s);

export {};
