// 090_static_blocks.ts — Static fields and blocks
//
// `static` members belong to the class itself, not to any instance. Field
// initializers run first, in order, and then `static {}` blocks run — so a
// block can overwrite, validate, or derive from the initial values.
//
// Can you find the problem?

class C {
  static count: ___ = 0;
  static {
    C.count = 3;
  }
}

console.log("ready:" + C.count);

export {};
