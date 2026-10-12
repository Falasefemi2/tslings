// 087_accessors.ts — Accessors
//
// Getters and setters look like plain property access from the outside but
// run code on every read and write. A setter can validate incoming values
// and refuse the ones that make no sense, keeping the object consistent.
//
// Can you find the problem?

class Temp {
  private _c = 0;
  get c(): number {
    return this._c;
  }
  set c(v: ___) {
    if (v >= -273) this._c = v;
  }
}

const t = new Temp();
t.c = 25;
console.log(t.c);

export {};
