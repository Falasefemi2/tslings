// 089_declaration_merging.ts — Declaration merging
//
// Two interfaces with the same name in one scope merge into a single type
// carrying every member of both. Libraries use this so that separate
// declarations can each contribute part of a larger shape.
//
// Can you find the problem?

interface Box {
  a: number;
}

interface Box {
  ___: number;
}

const box: Box = { a: 1, b: 2 };
console.log(`a:${box.a},b:${box.b}`);

export {};
