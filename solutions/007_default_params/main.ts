function greet(name: string = "world"): string {
  return `Hello, ${name}!`;
}

console.log(greet());
console.log(greet("Ada"));

export {};
