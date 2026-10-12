interface Box {
  a: number;
}

interface Box {
  b: number;
}

const box: Box = { a: 1, b: 2 };
console.log(`a:${box.a},b:${box.b}`);

export {};
