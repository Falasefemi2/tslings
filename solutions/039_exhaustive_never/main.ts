import type { Equal, Expect } from "../_support/types";

type S = "a" | "b" | "c";

function f(s: S): number {
  switch (s) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    default: {
      const exhaustive: never = s;
      return exhaustive;
    }
  }
}

type _Check = Expect<Equal<ReturnType<typeof f>, number>>;
