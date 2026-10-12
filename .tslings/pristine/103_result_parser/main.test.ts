// 103_result_parser.ts — Result-based parser
// Capstone: unions, narrowing, and records from earlier chapters. This
// parser turns "key=value;..." strings into objects, reporting failures
// through a `Result` type instead of throwing. The happy path, the empty
// input, and the malformed-pair branch all hinge on one blank.
//
// Can you find the problem?
import { test, expect } from "bun:test";
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
function parse(input: string): Result<Record<string, string>, string> {
  const out: Record<string, string> = {};
  if (input === "") return { ok: true, value: out };
  for (const pair of input.split(___)) {
    const eq = pair.indexOf("=");
    if (eq === -1) return { ok: false, error: `bad pair: ${pair}` };
    const key = pair.slice(0, eq);
    const value = pair.slice(eq + 1);
    out[key] = value;
  }
  return { ok: true, value: out };
}
test("parses two pairs", () => {
  expect(parse("a=1;b=2")).toEqual({ ok: true, value: { a: "1", b: "2" } });
});
test("empty input parses to an empty object", () => {
  expect(parse("")).toEqual({ ok: true, value: {} });
});
test("rejects a malformed pair", () => {
  expect(parse("a=1;zzz")).toEqual({ ok: false, error: "bad pair: zzz" });
});
test("keeps everything after the first equals sign", () => {
  expect(parse("a=b=c")).toEqual({ ok: true, value: { a: "b=c" } });
});
