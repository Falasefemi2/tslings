function word(n: number): string {
  switch (n) {
    case 0:
      return "zero";
    case 1:
      return "one";
    default:
      return "many";
  }
}

console.log(word(0));
console.log(word(1));
console.log(word(9));

export {};
