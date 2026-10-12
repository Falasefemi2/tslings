// 023_void_undefined.ts — void vs undefined
//
// `undefined` is a value and a type; `void` means "no usable value is
// returned". A function ending in a bare `return;` hands back
// `undefined`, and callers may store that result — but only if the
// declared return type says `undefined` rather than the vaguer `void`.
//
// Can you find the problem?

function f(): ___ {
  return;
}

const r: undefined = f();

export {};
