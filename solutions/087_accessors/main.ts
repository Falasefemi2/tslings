class Temp {
  private _c = 0;
  get c(): number {
    return this._c;
  }
  set c(v: number) {
    if (v >= -273) this._c = v;
  }
}

const t = new Temp();
t.c = 25;
console.log(t.c);

export {};
