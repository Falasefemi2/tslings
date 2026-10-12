function sign(n: number): string {
  if (n > 0) {
    return "positive";
  } else if (n < 0) {
    return "negative";
  }
  return "zero";
}

console.log(sign(42));

export {};
