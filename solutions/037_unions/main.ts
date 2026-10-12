function len(v: string | unknown[]): number {
  return v.length;
}

console.log(len("abcdefg"));
console.log(len([1, 2]));

export {};
