// 038_discriminated_unions.ts — Discriminated unions
//
// A discriminated union is a union where every member carries the same tag
// field — here `kind` — with a different literal value per member. Checking
// the tag narrows the whole object: inside `=== "circle"` TypeScript knows
// `r` exists, and past that branch only `Square` remains.
//
// Can you find the problem? Which property tells the two shapes apart?

type Circle = { kind: "circle"; r: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  if (shape.___ === "circle") {
    return Math.round(Math.PI * shape.r * shape.r * 100) / 100;
  }
  return shape.side * shape.side;
}

console.log(`circle:${area({ kind: "circle", r: 1 })}`);

export {};
