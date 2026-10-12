function word(n: number): string {
  let label: string = "";
  switch (n) {
    case 1:
      label = "one";
      break;
    case 2:
      label = "two";
      break;
    default:
      label = "other";
  }
  return label;
}

console.log(word(1));

export {};
