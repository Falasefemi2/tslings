function portOf(input: number | undefined): number {
  return input ?? 7;
}

console.log(portOf(0));
console.log(portOf(undefined));

export {};
