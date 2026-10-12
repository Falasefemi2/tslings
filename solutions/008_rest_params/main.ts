function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3));

export {};
