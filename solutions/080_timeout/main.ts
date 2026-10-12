function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const t = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error("too slow")), ms);
  });
  return Promise.race([p, t]);
}

const result = await withTimeout(new Promise<string>(() => {}), 10).catch(
  (e: unknown) => (e as Error).message,
);

console.log(result);

export {};
