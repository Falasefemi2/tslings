// 091_bun_file.ts — Bun.file and Bun.write
//
// Bun.file(path) creates a lazy handle to a file on disk: nothing is read
// until you call a method like .text() or .arrayBuffer(). Bun.write(path, data)
// writes a string, bytes, or even a Response body to disk in a single call.
// Together they cover most file I/O without ever opening a file handle.
//
// Can you find the problem?

import path from "node:path";
import { tmpdir } from "node:os";
import { unlink } from "node:fs/promises";

const p = path.join(tmpdir(), "tslings-091.txt");
await Bun.write(p, ___);
const back = await Bun.file(p).text();
console.log("roundtrip:" + back);
await unlink(p);

export {};
