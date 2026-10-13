// 005_annotation_inference.ts — Annotation vs inference
//
// You rarely need to annotate everything: TypeScript infers the type of
// `const language = "TypeScript"` as `string` on its own. An explicit
// annotation is a second source of truth — if it disagrees with the value,
// the compiler complains. Annotate the public shape, let the rest infer.
//
// This is a `compile`-mode exercise: it passes when it type-checks cleanly.
// There is nothing to run. Can you find the problem?

const language: string = "TypeScript";
const tooling: string = "tslings";

console.log(`${tooling} teaches ${language}.`);

export {};
