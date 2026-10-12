function assertStr(v: unknown): asserts v is string {
  if (typeof v !== "string") {
    throw new Error("nope");
  }
}

const maybe: unknown = "hello";
assertStr(maybe);
console.log(`ok:${maybe.length}`);

export {};
