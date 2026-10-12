// 068_custom_error.ts — Custom errors with cause
//
// Libraries often subclass `Error` to carry a status code plus a `cause`.
// The `cause` slot holds anything, so it stays `unknown` — the error-union
// idea applied to chaining: attach context without lying about its type.
// Callers narrow with `instanceof` before reading custom fields.
//
// Can you find the problem?
class HttpError extends Error {
  status: number;
  constructor(status: number, msg: string, opts?: { cause?: ___ }) {
    super(msg, opts);
    this.status = status;
    this.name = "HttpError";
  }
}

try {
  throw new HttpError(404, "missing", { cause: "db-flow" });
} catch (e) {
  if (e instanceof HttpError) {
    console.log(`${e.name} ${e.status}: ${e.message}`);
  } else {
    throw e;
  }
}

export {};
