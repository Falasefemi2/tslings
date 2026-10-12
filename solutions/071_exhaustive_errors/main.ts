type AppErr = { kind: "not-found" } | { kind: "denied" };

function describe(e: AppErr): string {
  switch (e.kind) {
    case "not-found":
      return "not found";
    case "denied":
      return "no access";
    default: {
      const _exhaustive: never = e;
      return _exhaustive;
    }
  }
}

console.log(describe({ kind: "not-found" }));

export {};
