// 071_exhaustive_errors.ts — Exhaustive error handling
//
// Error kinds form a discriminated union, just like the data unions
// from the narrowing chapter. A `switch` must handle every `kind`,
// and a `never` default turns a forgotten case into a compile error.
// One branch is missing its label, so the checker refuses the file.
//
// Can you spot the missing case?
type AppErr = { kind: "not-found" } | { kind: "denied" };

function describe(e: AppErr): string {
  switch (e.kind) {
    case "not-found":
      return "not found";
    case ___:
      return "no access";
    default: {
      const _exhaustive: never = e;
      return _exhaustive;
    }
  }
}

console.log(describe({ kind: "not-found" }));

export {};
