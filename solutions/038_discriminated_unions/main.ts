type Circle = { kind: "circle"; r: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.round(Math.PI * shape.r * shape.r * 100) / 100;
  }
  return shape.side * shape.side;
}

console.log(`circle:${area({ kind: "circle", r: 1 })}`);

export {};
