// 073_error_cause_chain.ts — Error cause chains
//
// `cause` links a low-level failure to the high-level error that wraps it,
// keeping the original evidence one hop away. The inner catch value is
// `unknown`, but `cause` accepts `unknown`, so it forwards as-is.
// Readers then walk the chain instead of guessing what went wrong.
//
// Can you find the problem?
function load(): string {
  try {
    throw new Error("ENOENT");
  } catch (e) {
    throw new Error("read-fail", { cause: ___ });
  }
}

try {
  load();
} catch (m) {
  if (m instanceof Error) {
    console.log(`${m.message} <- ${(m.cause as Error).message}`);
  } else {
    throw m;
  }
}

export {};
