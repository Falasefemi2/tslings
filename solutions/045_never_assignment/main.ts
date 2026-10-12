import type { Equal, Expect } from "../_support/types";

function fail(msg: string): never {
  throw new Error(msg);
}

const n: never = fail("boom");

type _Check = Expect<Equal<typeof n, never>>;
