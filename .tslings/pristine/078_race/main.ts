// 078_race.ts — Promise.race
//
// `Promise.race` settles with whichever promise settles first, ignoring the
// rest. Below, one promise never settles at all — that is fine, because the
// race only cares about the winner. The second slot of the race is empty.
//
// Can you find the problem? Fill in the ___ blank.

function fast(): Promise<string> {
  return Promise.resolve("fast");
}

const winner = await Promise.race([new Promise<string>(() => {}), ___]);

console.log(winner);

export {};
