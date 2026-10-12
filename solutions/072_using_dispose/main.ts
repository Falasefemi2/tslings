class Scope {
  constructor(private label: string) {}
  [Symbol.dispose](): void {
    console.log(this.label);
  }
}

{
  using _s = new Scope("done");
  console.log("work");
}

export {};
