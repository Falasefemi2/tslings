import type { Equal, Expect } from "../_support/types";

function req(method: "GET" | "POST"): string {
  return method;
}

type _Check = Expect<Equal<Parameters<typeof req>[0], "GET" | "POST">>;

console.log(req("GET"));
