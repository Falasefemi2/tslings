// 014_optional_chaining.ts — Optional chaining
//
// Properties marked with `?` may be absent, and reaching through them
// with a plain `.` risks a runtime crash on `undefined`. The `?.`
// operator short-circuits to `undefined` instead, and pairs naturally
// with `??` to supply a fallback when any link in the chain is missing.
//
// Can you find the problem?

interface User {
  name: string;
  address?: { city: string };
}

const user: User = { name: "Ada" };

const city: string = user.address?.city ?? ___;

console.log(city);

export {};
