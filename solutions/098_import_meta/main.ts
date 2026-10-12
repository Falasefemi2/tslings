import path from "node:path";

const here: string = import.meta.dir;
console.log("dir:" + path.basename(here));

export {};
