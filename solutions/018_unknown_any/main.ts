function parse(s: string): unknown {
  return JSON.parse(s);
}

const value: unknown = parse("42");

const n: number = typeof value === "number" ? value : 0;

console.log(n);

export {};
