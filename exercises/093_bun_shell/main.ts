// 093_bun_shell.ts — Bun.$ shell
//
// Bun's `$` template tag runs shell commands without leaving TypeScript:
// backticks hold the command, and helpers like .text() collect stdout as a
// string. It is perfect for gluing together small scripts and system tools.
//
// Can you find the problem?

import { $ } from "bun";

const out: ___ = await $`echo hello`.text();
console.log("shell:" + out.trimEnd());

export {};
