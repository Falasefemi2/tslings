// 098_import_meta.ts — import.meta
//
// Every module can inspect itself through `import.meta`. Under Bun,
// `import.meta.dir` holds the current file's directory, which pairs nicely
// with the node:path helpers for pulling out a basename or joining paths.
//
// Can you find the problem?

import path from "node:path";

const here: ___ = import.meta.dir;
console.log("dir:" + path.basename(here));

export {};
