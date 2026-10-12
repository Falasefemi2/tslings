interface Result<T> {
  ok: boolean;
  value?: T;
}

const r: Result<number> = { ok: true, value: 7 };

console.log(r.ok && r.value !== undefined ? `ok:${r.value}` : "bad");

export {};
