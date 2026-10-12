class C {
  static count: number = 0;
  static {
    C.count = 3;
  }
}

console.log("ready:" + C.count);

export {};
