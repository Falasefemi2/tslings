const proc = Bun.spawn(["bun", "--version"], { stdout: "pipe" });
const text: string = await new Response(proc.stdout as ReadableStream).text();
await proc.exited;
console.log("spawned:" + (text.trim().length > 0 ? "ok" : "empty"));

export {};
