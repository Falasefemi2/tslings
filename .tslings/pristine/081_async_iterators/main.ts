// 081_async_iterators.ts — Async iterators
//
// An `async function*` is an async generator: each `yield` produces one
// value, and callers pull them out with `for await...of`. The declared
// return type names what the generator yields, wrapped in `AsyncGenerator`.
// The return-type annotation below is missing.
//
// Can you find the problem? Fill in the ___ blank.

async function* range(n: number): ___ {
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
