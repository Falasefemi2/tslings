// 075_async_await.ts — async/await
//
// Marking a function `async` lets you `await` promises inside it, and the
// function itself always returns a promise. Even `return "hi"` becomes a
// promise for "hi" that the caller must await or `.then`.
// The return-type annotation below is missing.
//
// Can you find the problem? Fill in the ___ blank.

async function hello(): ___ {
  return "hi";
}

console.log(await hello());

export {};
