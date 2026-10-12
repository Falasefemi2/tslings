const s = new ReadableStream<string>({
  start(c) {
    c.enqueue("a");
    c.enqueue("b");
    c.enqueue("c");
    c.close();
  },
});

let out: string = "";
for await (const chunk of s) {
  out += chunk;
}
console.log(out.split("").join(","));

export {};
