// 012_switch.ts — Switch and fallthrough
//
// A `switch` picks one `case` by comparing the value, then keeps running
// every statement below it until it hits a `break`. Without that stop,
// execution slides into the next case and overwrites work the matched
// case just did. A single missing keyword can change the printed answer.
//
// Can you find the problem?

function word(n: number): string {
  let label: ___ = "";
  switch (n) {
    case 1:
      label = "one";
    case 2:
      label = "two";
      break;
    default:
      label = "other";
  }
  return label;
}

console.log(word(1));

export {};
