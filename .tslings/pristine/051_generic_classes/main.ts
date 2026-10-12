// 051_generic_classes.ts — Generic classes
//
// Classes take type parameters too: `Stack<T>` stores one kind of item,
// and `push`/`pop` both speak in terms of `T`. The stack below forgot
// which kind of item it holds, so `push(10)` has nothing to check against
// and the compiler refuses to build it.
//
// Can you find the problem? Fill in the ___ blank.

class Stack<T> {
  private items: T[] = [];
  push(v: T): void {
    this.items.push(v);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}

const s = new Stack<___>();
s.push(10);
console.log(s.pop() ?? -1);

export {};
