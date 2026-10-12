# tslings

Small, intentionally broken TypeScript programs. Fix them until they type-check and pass.

Modeled on [Ziglings](https://codeberg.org/ziglings/exercises) / Rustlings — and directly on its
Go sibling **[gopherlings](../gopherlings)** (same loop, same layout, same commands): the
exercises are the teacher, not a tutorial. One directory per exercise, a runner that stops at
the first failure, hints on demand, reference solutions under seal.

For developers who know basic programming and are new to TypeScript's type system, strictness,
and the [Bun](https://bun.sh) runtime. Requires **Bun 1.4+** and nothing else: no Node-only
tooling, no ts-node, no jest, no task runners. Runtime dependencies: none.

## Start here — how to run

```sh
cd tslings
bun install        # install dev deps (typescript + @types/bun)
bun run start      # check exercises in order, stop at the first failure
```

`start` prints something like this and exits non-zero:

```
[------------------------] 0/104  Exercise 001 / 104: Hello, tslings (exercises/001_hello/main.ts)
Chapter: Basics   Mode: run

Type errors:
  exercises\001_hello\main.ts:14:13  TS2304  Cannot find name '___'.
  13 |
  14 | console.log(___);
     |             ^

Run `bun run hint 1` for a hint.
Open exercises/001_hello/main.ts and fix it, then re-run.
```

Open the file it shows you, read the header comment, replace the `___` blank, save, re-run.
When exercise 001 passes, the runner moves on to 002. Repeat 104 times. 🎉

Live feedback while you edit:

```sh
bun run watch      # re-check the current exercise on every save (Ctrl-C to stop)
```

## The runner

```sh
bun run start      # check in order, stop at the first failure (default)
bun run check      # same as start
bun run run 29     # check only exercise 29 (number, "029" or "029_name" all work)
bun run hint 29    # print the hint (bare `bun run hint` = current exercise)
bun run list       # all exercises grouped by chapter, with solved/unsolved marks
bun run reset 29   # restore exercise 29 from its pristine copy (--yes skips confirm)
bun run solution 29 --yes   # print the reference solution (spoiler guard: --yes required)
```

Every command also works directly: `bun src/cli.ts run 29`. Exit codes are non-zero on
failure, so CI can use it. Colors respect `NO_COLOR=1` and dumb/non-TTY terminals.

To skip ahead, just open a later file — progress is whatever passes *right now*.
`solutions/` holds working versions for verification and CI; don't peek during normal runs.

### Exercise modes

Each exercise runs in one of three modes (shown in the header line and in `list`):

| Mode      | Passes when…                                                                                     |
|-----------|--------------------------------------------------------------------------------------------------|
| `compile` | The file type-checks clean under the strict config. Used for pure type puzzles (`Expect<Equal<…>>`). |
| `run`     | It type-checks clean, then `bun run` exits 0 and stdout matches the expected output exactly.      |
| `test`    | It type-checks clean, then `bun test` passes **and** the exact expected number of tests ran (deleting tests fails). |

Bun does not type-check, so the runner gates everything on the TypeScript compiler first —
a file with any diagnostic fails before it ever runs. Runtime exercises run in a subprocess
with a 5&nbsp;s timeout, so an infinite loop fails instead of hanging the runner.

### The `___` blank

Blanks are the identifier `___` (three underscores). It is deliberately undeclared, so it is
a type error (`TS2304: Cannot find name '___'`) until you replace it with the real code —
the equivalent of Zig's `???`. Each file's header comment explains the concept and ends with
a variant of *"Can you find the problem?"*. Hints live in the manifest (`bun run hint N`),
never in the file.

### The guard (anti-cheat)

`src/guard.ts` rejects cheap bypasses, checked before type-checking:

- `@ts-nocheck` / `@ts-ignore` always fail.
- `@ts-expect-error` fails unless the exercise explicitly allows it.
- Per-exercise `forbid: ["any"]` rejects every `any` (including `as any`), detected via the
  TypeScript AST — not regex — so `any` inside comments is safe.

This is a learning tool, not a security boundary: it catches the obvious evasions, nothing more.

## Project layout

```
tslings/
  package.json            scripts: start, check, run, watch, hint, list, reset, solution, verify, test
  tsconfig.json           strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes +
                          noImplicitOverride + noFallthroughCasesInSwitch + verbatimModuleSyntax.
                          Includes exercises/ so your editor shows red squiggles — intentional.
  Makefile                run / watch / verify / test / list shortcuts
  README.md               you are here
  src/
    cli.ts                entrypoint, subcommand dispatch
    manifest.ts           ordered exercise registry (typed)
    checker.ts            TS LanguageService-based type-check (cached across calls)
    runner.ts             runs an exercise per its mode, returns a structured result
    guard.ts              anti-cheat / tamper checks
    report.ts             terminal rendering (colors, source frames, progress bar)
    state.ts              progress cache in .tslings/state.json (list only; start/check always re-run)
    watch.ts              watch mode
  exercises/
    _support/types.ts     Expect<>, Equal<> type-test helpers
    001_hello/main.ts     one directory per exercise (main.ts, or main.test.ts for test mode)
    ...
  solutions/              reference solution per exercise, mirrored layout + _support/
  .tslings/pristine/      sealed pristine copies, used by `reset` and `verify`
  tests/                  bun:test suite for the system itself
```

## Curriculum (104 exercises)

| # | Chapter | Contents |
|---|---------|----------|
| 001–012 | Basics | hello world, const/let, primitives, template strings, annotation vs inference, functions, default/rest params, arrows, control flow, loops, switch fallthrough |
| 013–024 | Strictness and Null | strict null, optional chaining, nullish coalescing, the danger of `!`, definite assignment, unknown vs any, typeof/in/instanceof narrowing, truthiness traps, void vs undefined, exact optional properties |
| 025–036 | Data Structures | arrays, tuples, readonly, objects, index signatures + `noUncheckedIndexedAccess`, Map/Set, destructuring, spread, enums, `as const`, `satisfies`, optional properties |
| 037–045 | Unions and Narrowing | unions, discriminated unions, exhaustive `never` checks, type predicates, assertion functions, literals, template literal types, switch narrowing, `never` |
| 046–054 | Generics | generic functions, constraints, defaults, inference, generic interfaces/classes, keyof, indexed access, generic utilities |
| 055–066 | Type-Level Programming | mapped types, conditionals, distribution, `infer`, recursion, template literal manipulation, Pick/Omit/Awaited reimplemented, variadic tuples, branded types |
| 067–073 | Errors | catch-is-`unknown`, custom errors with `cause`, Result pattern, mapping Results, exhaustive errors, `using`/dispose (the defer analog), cause chains |
| 074–082 | Async | promises, async/await, all/allSettled/race, AbortController, timeouts, async iterators, microtask vs macrotask ordering |
| 083–090 | Classes and Modules | classes, `#private`, abstract, implements, accessors, `import type`, declaration merging, statics |
| 091–099 | Bun Runtime | Bun.file/write, Bun.serve (fetches itself on port 0), Bun.$, Bun.spawn, bun:test, env, Bun.sleep, import.meta, streams |
| 100–104 | Capstone | LRU cache, typed event emitter, typed router, Result-based parser, concurrency-limited job queue |

Deliberate gotchas: the `!` that compiles but crashes, `||` vs `??` on `0`, explicit
`undefined` under `exactOptionalPropertyTypes`, `Map.get` under `noUncheckedIndexedAccess`,
missing `override`, value-imported types under `verbatimModuleSyntax`, falling through a
`switch`, deleting (not just filling) lines, and tests you must not delete.

## Maintainers

```sh
bun run verify     # every solution PASSES and every pristine copy FAILS (in temp dirs; never touches exercises/)
bun run seal       # regenerate .tslings/pristine/ from exercises/ (run after editing exercises)
bun run test       # bun:test suite for the system itself (tests/)
make verify/test   # same via make
```

### How to add an exercise (step by step)

1. Pick the next number and a snake_case name: `exercises/105_something/main.ts`
   (`main.test.ts` for test mode — one file holding both the code and the `bun:test` tests).
2. Start the file with a header comment: `// 105_something.ts — Title`, a short explanation
   of the one concept, and a *"Can you find the problem?"* variant. No hints in the file.
3. Break it with 1–3 `___` blanks that **fail type-check** (undeclared name is the classic).
   A good exercise has one concept, minimal noise, and a unique solution — or a tight enough
   spec (expected stdout, `Expect<Equal<…>>`, test count) that the check is meaningful.
4. Add the mirror solution at `solutions/105_something/<same file>` (no `___`, passes clean).
5. Register it in `src/manifest.ts`: `{ n, dir, file, title, chapter, mode, expectedStdout?/expectedTests?, hint, forbid?, allow? }`.
   Keep numbers sequential and chapters contiguous.
6. Run `bun run seal`, then `bun run verify`, then `bun run test`. All green before you commit.

### System tests (tests/)

- Every pristine copy fails; every solution passes (same logic as `verify`, as a test).
- Manifest integrity: unique sequential numbers, dirs/files exist, solutions exist, no orphans, chapters contiguous and in order.
- Checker: reports the right line/col for a known type error; `@ts-ignore` is rejected by the guard.
- Runner: timeout kills an infinite-loop fixture; stdout mismatch fails; non-zero exit fails.
- `reset` restores pristine content; `solution` refuses without `--yes`.

## Notes and differences from gopherlings

- Same bones: per-exercise directories, mirrored `solutions/` and pristine copies, stop-at-first-failure loop, hints, `verify` (solutions pass + exercises fail), `Makefile`.
- `tslings` type-checks before running (Go's toolchain does both at once; Bun needs the extra gate), renders `file:line:col` diagnostics with source frames, and guards test counts and `any`-evasions.
- CLI is subcommands (`bun run run 29`) rather than flags (`--only 29`); `bun src/cli.ts <cmd>` also works.
- `list` reads a hash-keyed cache (`.tslings/state.json`) so it is instant; `start`/`check`/`run`/`verify` always re-run everything and never trust it.
