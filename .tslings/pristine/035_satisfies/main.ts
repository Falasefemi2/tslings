// 035_satisfies.ts — satisfies
//
// `satisfies` checks a value against a type without widening it: the object
// keeps its narrow literal types while still proving it fits the contract.
// A plain annotation like `Record<string, Hex>` would widen `red` to `Hex`,
// and the precise `"#f00"` type below would no longer line up — so the check
// has to happen with `satisfies`, keeping the literal intact.
//
// Can you find the problem?

type Hex = `#${string}`;

const palette = { red: "#f00" } satisfies ___;

const r: "#f00" = palette.red;
const label: string = Object.keys(palette)[0] ?? "missing";
console.log(label);

export {};
