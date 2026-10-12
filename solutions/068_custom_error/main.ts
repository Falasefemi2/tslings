class HttpError extends Error {
  status: number;
  constructor(status: number, msg: string, opts?: { cause?: unknown }) {
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
