// 027_readonly.ts — readonly arrays
//
// A parameter typed `readonly number[]` promises the function will not
// modify the caller's array: `push`, `pop`, and index assignment are all
// rejected by the compiler. Reach for it in any function that only reads
// its input. The stray mutation below breaks that promise and has to go.
//
// Can you find the problem?

function show(xs: ___): string {
  xs.push(4);
  return xs.join(",");
}

console.log(show([1, 2, 3]));

export {};
