// 076_all.ts — Promise.all
//
// `Promise.all` waits for every promise in the array and resolves with all
// their values. The results come back in the same order as the input array,
// no matter which promise finished first. That makes it the standard tool
// for running independent async work concurrently.
// The helper's return-type annotation below is missing.
//
// Can you find the problem? Fill in the ___ blank.

function fast(n: number): ___ {
  return Promise.resolve(n);
}

const [a, b, c] = await Promise.all([fast(1), fast(2), fast(3)]);

console.log(`${a},${b},${c}`);

export {};
