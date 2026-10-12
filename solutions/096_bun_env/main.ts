process.env.TSLINGS_LESSON = "tslings";
const v: string = process.env.TSLINGS_LESSON ?? "missing";
console.log("env:" + v);

export {};
