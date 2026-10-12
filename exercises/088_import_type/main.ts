// 088_import_type.ts — import type
//
// With `verbatimModuleSyntax`, a name that only exists as a type must be
// imported with `import type`, so the compiler knows to erase the whole
// import at runtime. Value imports and type-only imports are no longer
// interchangeable: each one says something about what survives to runtime.
// Erased imports cost nothing at runtime: they vanish before Bun runs the file.
//
// Can you find the problem?

import { Equal, Expect } from "../_support/types";

type Check = Expect<Equal<string, ___>>;

export {};
