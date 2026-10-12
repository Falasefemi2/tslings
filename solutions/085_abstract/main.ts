abstract class Animal {
  abstract speak(): string;
}

class Dog extends Animal {
  override speak(): string {
    return "woof";
  }
}

console.log(new Dog().speak());

export {};
