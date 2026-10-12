import { $ } from "bun";

const out: string = await $`echo hello`.text();
console.log("shell:" + out.trimEnd());

export {};
