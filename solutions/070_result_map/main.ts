type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function map<T, U, E>(r: Result<T, E>, f: (v: T) => U): Result<U, E> {
  if (!r.ok) {
    return r;
  }
  return { ok: true, value: f(r.value) };
}

const input: Result<number, string> = { ok: true, value: 4 };
const out = map(input, (v) => v + 1);
if (out.ok) {
  console.log("ok:" + out.value);
} else {
  console.log("err:" + out.error);
}

export {};
