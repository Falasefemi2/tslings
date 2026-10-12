const m = new Map<string, number>([["a", 2]]);
const seen = new Set<string>(["a"]);

const n: number = m.get("a") ?? 0;

console.log(seen.has("a") ? n : 0);

export {};
