function find(): { text: string } | null {
  return null;
}

const t: string = find()?.text ?? "fallback";

console.log("safe: " + t);

export {};
