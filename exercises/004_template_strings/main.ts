// 004_template_strings.ts — Template strings
//
// Backtick strings interpolate `${expressions}` and can span lines. They are
// usually clearer than gluing pieces with `+`, and TypeScript checks the
// embedded expressions just like any other code.
//
// Can you find the problem? The concatenation below references values that
// do not exist yet.

const friendName = "Ferris";
const friendAge = 5;
console.log("Hello, " + ___ + "! You are " + ___ + " years old.");

export {};
