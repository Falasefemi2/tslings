// 024_optional_params.ts — Optional properties
//
// A `?` marks a property the caller may omit — but under
// exactOptionalPropertyTypes, omitting a property and assigning it the
// value `undefined` on purpose are different things. Leaving the key out
// says "no nickname"; writing `nickname: undefined` is a type error.
// One line below takes the wrong route.
//
// Can you find the two problems?

interface User {
  name: string;
  nickname?: ___;
}

const good: User = { name: "Ada" };
const bad: User = { name: "Bo", nickname: undefined };
// The line above assigns undefined on purpose: delete it.

const nick: string | undefined = good.nickname;

export {};
