function describe(v: string | number): string {
  if (typeof v === "string") {
    return "str:" + v;
  }
  return "num:" + v;
}

console.log(describe("hi"));
console.log(describe(3));

export {};
