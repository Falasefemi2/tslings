function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const [x, y] = pair("s", 1);

void y;

console.log(typeof x);

export {};
