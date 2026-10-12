/**
 * Shared type-test helpers for solutions.
 *
 * Mirrors exercises/_support/types.ts so that solution files can use the
 * same `../_support/types` import path as their exercise counterparts.
 * Import them with `import type` (verbatimModuleSyntax requires it):
 *
 *   import type { Equal, Expect } from "../_support/types";
 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Expect<T extends true> = T;

export type NotEqual<X, Y> = Equal<X, Y> extends true ? false : true;
