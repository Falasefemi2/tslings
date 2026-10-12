// 082_task_order.ts — Microtasks vs macrotasks
//
// Not all "later" callbacks run at the same time. Microtasks (queueMicrotask
// and promise callbacks) always run before macrotasks (setTimeout), no
// matter how short the timeout is. The synchronous code below runs first,
// then the queued microtask, and only then the timer callback.
// One of the printed words is missing.
//
// Can you spot the gap? Fill in the ___ blank.

console.log("sync");
queueMicrotask(() => console.log(___));
setTimeout(() => console.log("macro"), 0);

export {};
