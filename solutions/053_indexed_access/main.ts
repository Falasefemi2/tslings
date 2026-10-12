interface User {
  name: string;
  age: number;
}

type Name = User["name"];

function getAge(u: User): number {
  return u.age;
}

const n: Name = "Ada";
const s: string = n;

console.log(getAge({ name: "Ada", age: 36 }), s);

export {};
