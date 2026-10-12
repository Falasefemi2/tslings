const counts: { [k: string]: number } = { a: 2 };

const n: number = counts["a"] ?? 0;
console.log(n);

export {};
