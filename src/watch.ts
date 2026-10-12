import { watch } from "node:fs";
import path from "node:path";
import { projectRoot } from "./checker.ts";
import type { ExerciseMeta } from "./manifest.ts";
import { cyan, dim, green, red } from "./report.ts";

export function exerciseRelPath(meta: ExerciseMeta): string {
  return path.join("exercises", meta.dir, meta.file);
}

export interface WatchHandlers {
  /** Re-check one exercise; returns true when it passes. */
  checkOne: (meta: ExerciseMeta) => Promise<boolean>;
  /** First unsolved exercise right now. */
  current: () => Promise<ExerciseMeta | undefined>;
  /** Exercise following `n`, or undefined when done. */
  nextAfter: (n: number) => Promise<ExerciseMeta | undefined>;
}

/** Watch the current exercise file and re-check on save (debounced). */
export async function startWatch(handlers: WatchHandlers): Promise<void> {
  let current = await handlers.current();
  if (!current) {
    console.log(green("All exercises pass. Nothing to watch!"));
    return;
  }
  console.log(cyan(`Watching ${exerciseRelPath(current)} — save the file to re-check. Ctrl-C to exit.`));

  let timer: ReturnType<typeof setTimeout> | undefined;
  let checking = false;
  let stopped = false;

  const onExit = (): void => {
    if (stopped) return;
    stopped = true;
    console.log(dim("\nWatcher stopped. Goodbye!"));
    process.exit(0);
  };
  process.on("SIGINT", onExit);
  process.on("SIGTERM", onExit);

  const filePath = (): string => path.join(projectRoot(), "exercises", current!.dir, current!.file);

  const recheck = async (): Promise<void> => {
    if (checking || stopped) return;
    checking = true;
    try {
      const passed = await handlers.checkOne(current!);
      if (passed && !stopped) {
        const next = await handlers.nextAfter(current!.n);
        if (!next) {
          console.log(green("All exercises pass. You are done!"));
          onExit();
          return;
        }
        current = next;
        watcher?.close();
        watcher = watchFile();
        console.log(cyan(`Advanced to ${exerciseRelPath(current)} — watching it now.`));
      }
    } finally {
      checking = false;
    }
  };

  const schedule = (): void => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => void recheck(), 150);
  };

  const watchFile = (): ReturnType<typeof watch> =>
    watch(filePath(), (event) => {
      if (event === "change" || event === "rename") schedule();
    });

  let watcher: ReturnType<typeof watch> | undefined;
  try {
    watcher = watchFile();
  } catch (err) {
    console.log(red(`Cannot watch ${exerciseRelPath(current)}: ${err instanceof Error ? err.message : String(err)}`));
    return;
  }

  // Keep the process alive until Ctrl-C.
  await new Promise(() => {});
}
