// 022_truthiness_traps.ts — Truthiness traps
//
// In a boolean position, `""`, `0`, and `NaN` count as false — but every
// other string counts as true, including `"0"` and `"false"`. Code that
// treats "a non-empty string means a real answer" gets surprised by text
// that looks empty yet is truthy, or input that is present but falsy.
//
// Can you find the problem?

function label(s: string): string {
  return ___ ? "truthy" : "falsy";
}

console.log(label(""));
console.log(label("0"));

export {};
