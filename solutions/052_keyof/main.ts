function get<O, K extends keyof O>(o: O, k: K): O[K] {
  return o[k];
}

console.log(get({ name: "Ada" }, "name"));

export {};
