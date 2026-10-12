async function* range(n: number): AsyncGenerator<number> {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

const out: number[] = [];
for await (const x of range(3)) {
  out.push(x);
}

console.log(out.join(","));

export {};
