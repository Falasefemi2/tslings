// 016_non_null_danger.ts — The danger of !
//
// The `!` operator tells the compiler "trust me, this is not null" —
// and the compiler believes you, even when you are wrong. If the value
// really is null, the program crashes at runtime where no type error
// warned you. A `?.` chain with a `??` fallback stays honest instead.
//
// Can you find the problem?

function find(): { text: string } | null {
  return null;
}

const t: string = ___;

console.log("safe: " + t);

export {};
