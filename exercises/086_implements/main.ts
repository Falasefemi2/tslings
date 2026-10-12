// 086_implements.ts — implements
//
// An interface describes a shape; `implements` makes the compiler verify a
// class actually has that shape. If a method is missing or mistyped, the
// declaration line — not the call site — gets the error.
//
// Can you find the problem?

interface Seq {
  next(): number;
}

class Counter implements ___ {
  private n = 0;
  next(): number {
    return ++this.n;
  }
}

const counter = new Counter();
console.log([counter.next(), counter.next(), counter.next()].join(","));

export {};
