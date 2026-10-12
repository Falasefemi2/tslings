type Pair<T, U = number> = [T, U];

const p: Pair<string> = ["a", 1];

console.log(p.join(","));

export {};
