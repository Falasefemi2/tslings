function isNum(v: unknown): v is number {
  return typeof v === "number";
}

const mixed: unknown[] = [1, "a", 3, "b", 5];
const ns: number[] = mixed.filter(isNum);

console.log(ns.join(","));

export {};
