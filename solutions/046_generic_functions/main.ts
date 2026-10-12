function wrap<T>(v: T): T[] {
  return [v];
}

console.log(wrap(42).join(","));

export {};
