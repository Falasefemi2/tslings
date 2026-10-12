// 070_result_map.ts — Mapping over Result
//
// `map` transforms the success value and passes errors through untouched,
// the error-domain version of mapping over an array or an option.
// The early return hands back the failure branch already narrowed.
// Success gets rebuilt with the mapped value inside.
//
// Can you find the problem?
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function map<T, U, E>(r: Result<T, E>, f: (v: T) => U): Result<U, E> {
  if (!r.ok) {
    return ___;
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
