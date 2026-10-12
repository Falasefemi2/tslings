const a = [1, 2];
const b = [3, 4];

const c: number[] = [...a, ...b];

console.log(c.join(","));

export {};
