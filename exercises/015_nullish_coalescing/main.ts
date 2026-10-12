// 015_nullish_coalescing.ts — Nullish coalescing
//
// `??` supplies a default only for `null` or `undefined`, while `||`
// falls back for every falsy value — including `0` and `""`. When zero
// is a legitimate setting, like a port or a timeout, the wrong operator
// silently replaces a real answer with the default.
//
// Can you find the problem?

function portOf(input: number | undefined): number {
  return input ?? ___;
}

console.log(portOf(0));
console.log(portOf(undefined));

export {};
