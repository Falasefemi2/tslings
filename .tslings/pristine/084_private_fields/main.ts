// 084_private_fields.ts — #private fields
//
// A `#` field is truly private: only code inside the class body can touch
// it, so outsiders must go through methods or accessors. That is stricter
// than the `private` keyword, which is only a compile-time check.
// A getter can expose a read-only view of the hidden state.
//
// Can you find the problem?

class Vault {
  #balance: number = 0;
  deposit(n: number): void {
    this.#balance += n;
  }
  get balance(): ___ {
    return this.#balance;
  }
}

const vault = new Vault();
vault.deposit(100);
console.log("balance:" + vault.balance);

export {};
