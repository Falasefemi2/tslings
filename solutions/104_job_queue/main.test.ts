// 104_job_queue.ts — Job queue
// Capstone: async/await, classes, and generics from earlier chapters.
// This queue caps how many async jobs run at once: extras wait their
// turn, every job still resolves with its own value, and a `finally`
// block always frees the slot. The gate below is one blank away
// from correct.
//
// Can you find the problem?
import { test, expect } from "bun:test";
class Queue {
  private running = 0;
  constructor(private limit: number) {}
  async add<T>(job: () => Promise<T>): Promise<T> {
    while (this.running >= this.limit) {
      await Bun.sleep(1);
    }
    this.running++;
    try {
      return await job();
    } finally {
      this.running--;
    }
  }
}
test("collects every result in order", async () => {
  const q = new Queue(2);
  const results = await Promise.all(
    [0, 1, 2, 3, 4].map((i) =>
      q.add(async () => {
        await Bun.sleep(5 - i);
        return i * 2;
      }),
    ),
  );
  expect(results).toEqual([0, 2, 4, 6, 8]);
});
test("never exceeds the concurrency limit", async () => {
  const q = new Queue(2);
  let running = 0;
  let maxRunning = 0;
  const job = async (id: number): Promise<number> => {
    running++;
    if (running > maxRunning) maxRunning = running;
    await Bun.sleep(10);
    running--;
    return id;
  };
  const results = await Promise.all([0, 1, 2, 3, 4].map((i) => q.add(() => job(i))));
  expect(results).toEqual([0, 1, 2, 3, 4]);
  expect(maxRunning).toBe(2);
});
test("serializes work with limit 1", async () => {
  const q = new Queue(1);
  let running = 0;
  let maxRunning = 0;
  const job = async (id: number): Promise<number> => {
    running++;
    if (running > maxRunning) maxRunning = running;
    await Bun.sleep(5);
    running--;
    return id * 10;
  };
  const results = await Promise.all([0, 1, 2].map((i) => q.add(() => job(i))));
  expect(results).toEqual([0, 10, 20]);
  expect(maxRunning).toBe(1);
});
