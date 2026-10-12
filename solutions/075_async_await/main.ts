async function hello(): Promise<string> {
  return "hi";
}

console.log(await hello());

export {};
