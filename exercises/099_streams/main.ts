// 099_streams.ts — Web streams
//
// A ReadableStream produces chunks over time: enqueue() pushes values in,
// close() signals the end, and `for await` pulls each chunk out in order.
// Bun implements the web standard, so this works the same in every runtime.
//
// Can you find the problem?

const s = new ReadableStream<string>({
  start(c) {
    c.enqueue("a");
    c.enqueue("b");
    c.enqueue("c");
    c.close();
  },
});

let out: ___ = "";
for await (const chunk of s) {
  out += chunk;
}
console.log(out.split("").join(","));

export {};
