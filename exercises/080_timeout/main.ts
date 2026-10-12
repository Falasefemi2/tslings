// 080_timeout.ts — Timeouts
//
// A common timeout helper races your promise against a timer that rejects
// after `ms` milliseconds. If your promise is too slow, the timer wins and
// the race rejects with "too slow". To see the timeout fire, the helper
// needs a promise that never settles in time.
//
// Can you find the problem? Fill in the ___ blank: pass a promise that
// never settles, so the timeout wins the race.

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const t = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error("too slow")), ms);
  });
  return Promise.race([p, t]);
}

const result = await withTimeout(___, 10).catch(
  (e: unknown) => (e as Error).message,
);

console.log(result);

export {};
