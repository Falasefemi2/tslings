try {
  throw new Error("boom");
} catch (e) {
  console.log("caught: " + (e as Error).message);
}

export {};
