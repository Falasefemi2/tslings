// 021_instanceof_narrowing.ts — instanceof narrowing
//
// `instanceof` asks which class built an object, and narrows a union of
// class instances down to the matching member. Inside the guarded branch
// the compiler knows the exact class, including its methods and fields;
// outside of it, only what every member shares is visible.
//
// Can you find the problem?

class Dog {
  constructor(public name: string) {}

  bark(): string {
    return "woof";
  }
}

class Cat {
  constructor(public name: string) {}

  meow(): string {
    return "meow";
  }
}

function label(pet: Dog | Cat): string {
  if (pet instanceof ___) {
    return "dog: " + pet.name;
  }
  return "cat: " + pet.name;
}

console.log(label(new Dog("Rex")));

export {};
