class Vault {
  #balance: number = 0;
  deposit(n: number): void {
    this.#balance += n;
  }
  get balance(): number {
    return this.#balance;
  }
}

const vault = new Vault();
vault.deposit(100);
console.log("balance:" + vault.balance);

export {};
