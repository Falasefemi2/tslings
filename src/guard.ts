import ts from "typescript";
import type { ExerciseMeta } from "./manifest.ts";

export interface GuardViolation {
  reason: string;
  line?: number;
}

function lineOf(source: string, pos: number): number {
  return source.slice(0, Math.max(0, pos)).split("\n").length;
}

/**
 * Anti-cheat / tamper checks. This is a learning tool, not a security
 * boundary: the checks only catch the obvious bypasses.
 */
export function checkGuard(source: string, meta: ExerciseMeta): GuardViolation | null {
  if (source.includes("@ts-nocheck")) {
    return {
      reason: "Guard: @ts-nocheck is not allowed. Remove it and fix the types instead.",
      line: lineOf(source, source.indexOf("@ts-nocheck")),
    };
  }
  if (source.includes("@ts-ignore")) {
    return {
      reason: "Guard: @ts-ignore is not allowed. Remove it and fix the types instead.",
      line: lineOf(source, source.indexOf("@ts-ignore")),
    };
  }
  if (source.includes("@ts-expect-error")) {
    const allowed = (meta.allow ?? []).some((a) => a.includes("expect-error"));
    if (!allowed) {
      return {
        reason: "Guard: @ts-expect-error is not allowed in this exercise.",
        line: lineOf(source, source.indexOf("@ts-expect-error")),
      };
    }
  }
  const forbid = meta.forbid ?? [];
  if (forbid.includes("any")) {
    // Use the TS AST (not regex) so `any` inside comments is not flagged,
    // while annotations, `as any`, and `as unknown as any` are all caught
    // via the AnyKeyword node.
    const sf = ts.createSourceFile("exercise.ts", source, ts.ScriptTarget.ESNext, true);
    let found: number | undefined;
    const visit = (node: ts.Node): void => {
      if (found !== undefined) return;
      if (node.kind === ts.SyntaxKind.AnyKeyword) found = node.getStart(sf);
      ts.forEachChild(node, visit);
    };
    visit(sf);
    if (found !== undefined) {
      return {
        reason: "Guard: `any` is forbidden in this exercise (including `as any`). Use `unknown` + narrowing.",
        line: lineOf(source, found),
      };
    }
  }
  for (const token of forbid) {
    if (token === "any") continue;
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const m = new RegExp(`\\b${escaped}\\b`).exec(source);
    if (m) {
      return {
        reason: `Guard: \`${token}\` is forbidden in this exercise.`,
        line: lineOf(source, m.index),
      };
    }
  }
  return null;
}
