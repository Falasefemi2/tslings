class Stack<T> {
  private items: T[] = [];
  push(v: T): void {
    this.items.push(v);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}

const s = new Stack<number>();
s.push(10);
console.log(s.pop() ?? -1);

export {};
