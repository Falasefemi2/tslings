function load(): string {
  try {
    throw new Error("ENOENT");
  } catch (e) {
    throw new Error("read-fail", { cause: e });
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
