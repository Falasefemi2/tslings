function pluck<T, K extends keyof T>(xs: T[], k: K): T[K][] {
  return xs.map((x) => x[k]);
}

console.log(pluck([{ n: 5 }], "n").join(","));

export {};
