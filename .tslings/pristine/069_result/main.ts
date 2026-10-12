// 069_result.ts — The Result pattern
//
// Not every failure should throw: `Result<T, E>` stores success or
// failure in one value, like an error union you return instead of raise.
// Callers narrow on the `ok` flag, then read `value` or `error`.
// It is the explicit, local cousin of try/catch.
//
// Can you find the problem?
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function sqrt(v: number): ___ {
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
