// 079_abort.ts — AbortController
//
// An `AbortController` lets you cancel async work: its `.signal` starts out
// un-aborted and flips to aborted when you call `.abort()`. Well-behaved
// async functions accept that signal and reject instead of doing the work.
// The signal's parameter type below is missing.
//
// Can you find the problem? Fill in the ___ blank.

function work(signal: ___): Promise<string> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("aborted"));
    } else {
      resolve("done");
    }
  });
}

const c = new AbortController();
c.abort();

try {
  console.log(await work(c.signal));
} catch (e: unknown) {
  console.log((e as Error).message);
}

export {};
