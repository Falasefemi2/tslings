// 094_bun_spawn.ts — Bun.spawn
//
// Bun.spawn() launches a child process and returns a handle to it. With
// `stdout: "pipe"` the child's output becomes a ReadableStream you can wrap
// in a Response to read as text, while `proc.exited` resolves on completion.
//
// Can you find the problem?

const proc = Bun.spawn(["bun", "--version"], { stdout: "pipe" });
const text: ___ = await new Response(proc.stdout as ReadableStream).text();
await proc.exited;
console.log("spawned:" + (text.trim().length > 0 ? "ok" : "empty"));

export {};
