class User {
  constructor(public name: string, public age: number) {}
  label(): string {
    return `${this.name}:${this.age}`;
  }
}

console.log(new User("Ada", 30).label());

export {};
