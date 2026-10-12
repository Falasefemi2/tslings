// 020_in_narrowing.ts — in narrowing
//
// The `in` operator tests whether an object has a property, and the
// compiler uses that test to narrow unions of object types. When each
// member of the union carries a unique property, one `in` check is
// enough to tell them apart and unlock the right shape in each branch.
//
// Can you find the problem?

interface Cat {
  meow: string;
  name: string;
}

interface Dog {
  bark: string;
  name: string;
}

function label(pet: Cat | Dog): string {
  if (___ in pet) {
    return "cat:" + pet.name;
  }
  return "dog:" + pet.name;
}

const pet: Cat | Dog = { meow: "loud", name: "Whiskers" };

console.log(label(pet));

export {};
