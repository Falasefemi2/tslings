function answer(): Promise<number> {
  return Promise.resolve(42);
}

answer().then((v) => console.log(v));

export {};
