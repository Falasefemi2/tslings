console.log("sync");
queueMicrotask(() => console.log("micro"));
setTimeout(() => console.log("macro"), 0);

export {};
