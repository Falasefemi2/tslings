// 085_abstract.ts — Abstract classes
//
// An abstract class sketches a contract: `abstract` methods have no body,
// and only a concrete subclass can be instantiated. The subclass must
// provide its own version of every abstract member it inherits.
//
// Can you spot what is missing?

abstract class Animal {
  abstract speak(): string;
}

class Dog extends Animal {
  ___ speak(): string {
    return "woof";
  }
}

console.log(new Dog().speak());

export {};
