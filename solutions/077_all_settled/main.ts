const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("bad"),
]);

for (const r of results) {
  if (r.status === "fulfilled") {
    console.log("fulfilled:" + r.value);
  } else {
    console.log("rejected:" + r.reason);
  }
}

export {};
