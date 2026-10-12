import type { Equal, Expect } from "../_support/types";

interface Config {
  host: string;
  port?: number;
}

const c: Config = { host: "x" };

type Check = Expect<Equal<Config["port"], number | undefined>>;

console.log(c.host);

export {};
