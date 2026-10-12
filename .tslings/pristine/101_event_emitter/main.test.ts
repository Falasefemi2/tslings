// 101_event_emitter.ts — Typed event emitter
// Capstone: generics, mapped constraints, and classes from earlier
// chapters. A typed emitter routes each event name to its own listener
// list, with the payload type looked up from one shared `Events` table.
// Registration and dispatch already work; one load-bearing annotation
// stands in for real logic.
//
// Can you find the problem?
import { test, expect } from "bun:test";
type Events = {
  login: { user: string };
  tick: number;
};
class Emitter<E extends Record<string, unknown>> {
  private handlers = new Map<keyof E, Array<(payload: unknown) => void>>();

  on<K extends keyof E>(ev: K, fn: (payload: E[K]) => void): void {
    const list = this.handlers.get(ev);
    const f = fn as (payload: unknown) => void;
    if (list === undefined) {
      this.handlers.set(ev, [f]);
    } else {
      list.push(f);
    }
  }

  emit<K extends keyof E>(ev: K, payload: ___): void {
    const list = this.handlers.get(ev);
    if (list === undefined) return;
    for (const fn of list) fn(payload);
  }
}
test("login listener receives the payload object", () => {
  const em = new Emitter<Events>();
  let got: { user: string } | undefined;
  em.on("login", (p) => { got = p; });
  em.emit("login", { user: "ada" });
  expect(got).toEqual({ user: "ada" });
});
test("tick payloads accumulate", () => {
  const em = new Emitter<Events>();
  let total = 0;
  em.on("tick", (n) => { total += n; });
  em.emit("tick", 1);
  em.emit("tick", 2);
  em.emit("tick", 3);
  expect(total).toBe(6);
});
test("multiple listeners all fire", () => {
  const em = new Emitter<Events>();
  const seen: number[] = [];
  em.on("tick", (n) => { seen.push(n); });
  em.on("tick", (n) => { seen.push(n * 10); });
  em.emit("tick", 5);
  expect(seen).toEqual([5, 50]);
});
test("events do not leak across names", () => {
  const em = new Emitter<Events>();
  let logins = 0;
  let ticks = 0;
  em.on("login", () => { logins++; });
  em.on("tick", () => { ticks++; });
  em.emit("tick", 1);
  em.emit("tick", 2);
  expect(ticks).toBe(2);
  expect(logins).toBe(0);
});
