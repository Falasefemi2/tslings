// 100_lru_cache.ts — LRU cache
// Capstone: generics, classes, and Map ordering from earlier chapters.
// An LRU cache keeps at most `capacity` entries: every get or set
// refreshes a key, and inserting past capacity evicts the oldest key.
// The class below is one expression away from correct.
//
// Can you find the problem?
import { test, expect } from "bun:test";
class LRUCache<K, V> {
  private map = new Map<K, V>();
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    const value = this.map.get(key);
    if (value === undefined) return undefined;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldest = this.map.keys().next();
      if (!oldest.done) this.map.delete(oldest.value);
    }
  }

  size(): number {
    return this.map.size;
  }
}
test("basic get and set", () => {
  const cache = new LRUCache<string, string>(2);
  cache.set("a", "1");
  cache.set("b", "2");
  expect(cache.get("a")).toBe("1");
  expect(cache.get("b")).toBe("2");
  expect(cache.get("missing")).toBeUndefined();
});
test("evicts the least-recently-used entry", () => {
  const cache = new LRUCache<string, string>(2);
  cache.set("a", "1");
  cache.set("b", "2");
  cache.set("c", "3");
  expect(cache.get("a")).toBeUndefined();
  expect(cache.get("b")).toBe("2");
  expect(cache.get("c")).toBe("3");
});
test("access refreshes recency", () => {
  const cache = new LRUCache<string, string>(2);
  cache.set("a", "1");
  cache.set("b", "2");
  expect(cache.get("a")).toBe("1");
  cache.set("c", "3");
  expect(cache.get("a")).toBe("1");
  expect(cache.get("b")).toBeUndefined();
});
test("updating a key keeps size stable", () => {
  const cache = new LRUCache<string, string>(2);
  cache.set("a", "1");
  cache.set("b", "2");
  cache.set("a", "10");
  expect(cache.size()).toBe(2);
  expect(cache.get("a")).toBe("10");
  expect(cache.get("b")).toBe("2");
});
