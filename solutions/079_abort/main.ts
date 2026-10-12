function work(signal: AbortSignal): Promise<string> {
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
