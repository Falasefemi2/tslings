// 036_optional_props.ts — Optional properties
//
// A `?` marks a property as optional: callers may omit `port`, but when it
// is present it must be a `number`. With `exactOptionalPropertyTypes` the
// optionality is exact — even an explicit `port: undefined` is rejected —
// so reading `Config["port"]` always accounts for the property being absent.
// The check below pins that reading down to `number | undefined`.
//
// Can you find the problem?

import type { Equal, Expect } from "../_support/types";

interface Config {
  host: string;
  port?: ___;
}

const c: Config = { host: "x" };

type Check = Expect<Equal<Config["port"], number | undefined>>;

console.log(c.host);

export {};
