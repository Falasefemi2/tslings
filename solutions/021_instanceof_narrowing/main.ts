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
  if (pet instanceof Dog) {
    return "dog: " + pet.name;
  }
  return "cat: " + pet.name;
}

console.log(label(new Dog("Rex")));

export {};
