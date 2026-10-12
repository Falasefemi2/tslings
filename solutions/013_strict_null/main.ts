function greet(name: string | null): string {
  return name ?? "hello";
}

console.log(greet(null));

export {};
