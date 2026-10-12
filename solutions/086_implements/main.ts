interface Seq {
  next(): number;
}

class Counter implements Seq {
  private n = 0;
  next(): number {
    return ++this.n;
  }
}

const counter = new Counter();
console.log([counter.next(), counter.next(), counter.next()].join(","));

export {};
