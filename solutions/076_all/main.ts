function fast(n: number): Promise<number> {
  return Promise.resolve(n);
}

const [a, b, c] = await Promise.all([fast(1), fast(2), fast(3)]);

console.log(`${a},${b},${c}`);

export {};
