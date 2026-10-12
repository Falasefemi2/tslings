const user = { name: "Ada", age: 30 };

const { name, age }: { name: string; age: number } = user;

console.log(`${name} ${age}`);

export {};
