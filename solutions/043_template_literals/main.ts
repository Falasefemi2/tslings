import type { Equal, Expect } from "../_support/types";

type Key = `user:${number}`;

type _Check = Expect<Equal<Key, `user:${number}`>>;

const k: Key = "user:42";
console.log(k);
