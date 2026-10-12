// 096_bun_env.ts — Environment variables
//
// Programs read configuration from `process.env`, a dictionary where every
// value is a string or undefined. Since a variable may be missing entirely,
// careful code always supplies a fallback before treating it as a string.
//
// Can you find the problem?

process.env.TSLINGS_LESSON = "tslings";
const v: ___ = process.env.TSLINGS_LESSON ?? "missing";
console.log("env:" + v);

export {};
