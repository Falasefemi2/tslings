// 077_all_settled.ts — Promise.allSettled
//
// Unlike `Promise.all`, `Promise.allSettled` never rejects: it waits for
// every promise and reports each outcome as `{ status: "fulfilled", value }`
// or `{ status: "rejected", reason }`. Checking `status` narrows the union,
// so TypeScript knows which field is safe to read in each branch.
// The status string below is missing.
//
// Can you find the problem? Fill in the ___ blank.

const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("bad"),
]);

for (const r of results) {
  if (r.status === ___) {
    console.log("fulfilled:" + r.value);
  } else {
    console.log("rejected:" + r.reason);
  }
}

export {};
