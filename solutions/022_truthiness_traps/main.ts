function label(s: string): string {
  return s ? "truthy" : "falsy";
}

console.log(label(""));
console.log(label("0"));

export {};
