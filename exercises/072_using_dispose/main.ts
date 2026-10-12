// 072_using_dispose.ts — using is defer
//
// `using` runs `[Symbol.dispose]` when the block scope exits, the
// deterministic cleanup that `defer` and `errdefer` give you elsewhere.
// Declare the guard inside a block: normal exit and exceptions both run it.
// The label below decides what the cleanup step prints last.
//
// Can you find the problem?
class Scope {
  constructor(private label: string) {}
  [Symbol.dispose](): void {
    console.log(this.label);
  }
}

{
  using _s = new Scope(___);
  console.log("work");
}

export {};
