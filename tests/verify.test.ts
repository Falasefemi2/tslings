import { describe, expect, test } from "bun:test";
import { EXERCISES } from "../src/manifest.ts";
import { verifyAll } from "../src/cli.ts";

describe("verify", () => {
  test(
    "every pristine copy fails and every solution passes",
    async () => {
      const { outcomes, failed } = await verifyAll();
      expect(outcomes.length).toBe(EXERCISES.length);
      const bad = outcomes.filter((o) => !o.pristineFails || !o.solutionPasses);
      expect(bad).toEqual([]);
      expect(failed).toBe(false);
    },
    300000,
  );
});
