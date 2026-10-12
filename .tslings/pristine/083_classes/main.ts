// 083_classes.ts — Classes
//
// A class bundles data with behavior. The constructor runs on every `new`
// to set up the instance, and methods use `this` to reach its fields.
// TypeScript wants every method's return type written out explicitly.
//
// Can you find the problem?

class User {
  constructor(public name: string, public age: number) {}
  label(): ___ {
    return `${this.name}:${this.age}`;
  }
}

console.log(new User("Ada", 30).label());

export {};
