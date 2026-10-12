interface Cat {
  meow: string;
  name: string;
}

interface Dog {
  bark: string;
  name: string;
}

function label(pet: Cat | Dog): string {
  if ("meow" in pet) {
    return "cat:" + pet.name;
  }
  return "dog:" + pet.name;
}

const pet: Cat | Dog = { meow: "loud", name: "Whiskers" };

console.log(label(pet));

export {};
