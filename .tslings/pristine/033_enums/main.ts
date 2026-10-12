// 033_enums.ts — Enums
//
// An `enum` names a fixed set of related constants under one type. A string
// enum like `Color` gives each member a readable runtime value, and the
// annotation `c: Color` restricts the variable to members of that enum — a
// stray string such as `"green"` is rejected even though it is a string.
//
// Can you find the problem?

enum Color {
  Red = "red",
  Blue = "blue",
}

const c: ___ = Color.Red;
console.log(c);

export {};
