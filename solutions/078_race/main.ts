function fast(): Promise<string> {
  return Promise.resolve("fast");
}

const winner = await Promise.race([new Promise<string>(() => {}), fast()]);

console.log(winner);

export {};
