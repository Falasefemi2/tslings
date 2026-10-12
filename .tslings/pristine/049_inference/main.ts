// 049_inference.ts — Type inference
//
// You rarely write type arguments by hand: TypeScript infers them from the
// values you pass in. `pair("s", 1)` produces `[string, number]` without a
// single annotation. Here the first value went missing, so there is
// nothing left to infer its type from.
//
// Can you find the problem? Fill in the ___ blank.

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const [x, y] = pair(___, 1);

void y;

console.log(typeof x);

export {};
