// 097_bun_sleep.ts — Bun.sleep
//
// Bun.sleep(ms) pauses the current async scope for a number of milliseconds,
// much friendlier than wrapping setTimeout in a Promise by hand. It works
// with top-level await, so scripts can pace themselves line by line.
//
// Can you find the problem?

await Bun.sleep(___);
console.log("slept");

export {};
