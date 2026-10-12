type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function sqrt(v: number): Result<number, string> {
  if (v < 0) {
    return { ok: false, error: "neg" };
  }
  return { ok: true, value: Math.sqrt(v) };
}

const r = sqrt(16);
if (r.ok) {
  console.log("ok:" + r.value);
} else {
  console.log("err:" + r.error);
}

export {};
