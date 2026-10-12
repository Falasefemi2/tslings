// 044_switch_narrowing.ts — Switch narrowing
//
// `switch` narrows just like `if`: each `case` pins the value to that exact
// literal, and `default` gets whatever is left over. Here `0` and `1` get
// their own words while every other number falls through to "many" — so one
// annotated parameter covers all three calls below.
//
// Can you find the problem? The parameter type is missing.

function word(n: ___): string {
  switch (n) {
    case 0:
      return "zero";
    case 1:
      return "one";
    default:
      return "many";
  }
}

console.log(word(0));
console.log(word(1));
console.log(word(9));

export {};
