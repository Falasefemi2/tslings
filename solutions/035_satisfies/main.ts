type Hex = `#${string}`;

const palette = { red: "#f00" } satisfies Record<string, Hex>;

const r: "#f00" = palette.red;
const label: string = Object.keys(palette)[0] ?? "missing";
console.log(label);

export {};
