import path from "node:path";
import { tmpdir } from "node:os";
import { unlink } from "node:fs/promises";

const p = path.join(tmpdir(), "tslings-091.txt");
await Bun.write(p, "hello-bun");
const back = await Bun.file(p).text();
console.log("roundtrip:" + back);
await unlink(p);

export {};
