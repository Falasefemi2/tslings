import path from "node:path";
import { createHash } from "node:crypto";
import { MANIFEST_VERSION } from "./manifest.ts";

export function hashContent(s: string): string {
  return createHash("sha256").update(s, "utf8").digest("hex").slice(0, 16);
}

interface StateEntries {
  [file: string]: { hash: string; solved: boolean };
}

export interface StateFile {
  version: number;
  entries: StateEntries;
}

function statePath(): string {
  return path.join(path.resolve(import.meta.dir, ".."), ".tslings", "state.json");
}

export async function loadState(): Promise<StateFile> {
  try {
    const raw = await Bun.file(statePath()).text();
    const parsed = JSON.parse(raw) as StateFile;
    if (parsed.version !== MANIFEST_VERSION || typeof parsed.entries !== "object" || parsed.entries === null) {
      return { version: MANIFEST_VERSION, entries: {} };
    }
    return parsed;
  } catch {
    return { version: MANIFEST_VERSION, entries: {} };
  }
}

export async function saveState(s: StateFile): Promise<void> {
  await Bun.write(statePath(), JSON.stringify(s, null, 2) + "\n");
}

export async function markSolved(file: string, hash: string, solved: boolean): Promise<void> {
  const s = await loadState();
  s.version = MANIFEST_VERSION;
  s.entries[file] = { hash, solved };
  await saveState(s);
}

/** Fast path for `list`: solved only if the cached hash matches current content. */
export async function cachedSolved(file: string, currentHash: string): Promise<boolean> {
  const s = await loadState();
  const e = s.entries[file];
  return !!e && e.solved && e.hash === currentHash;
}
