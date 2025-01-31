class Account {
  constructor() {
    this.transactions = [];
  }

  get balance() {
    return this.transactions
      .map((transaction) => transaction.value)
      .reduce((prev, cur) => prev + cur, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    // the entire object is passed in
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.account.addTransaction(this);
    return true;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.amount <= this.account.balance;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// const myAccount = new Account();

// console.log("Starting Account Balance: ", myAccount.balance);

// console.log("Attempting to withdraw even $1 should fail...");
// const t1 = new Withdrawal(1.0, myAccount);
// console.log("Commit result:", t1.commit());
// console.log("Account Balance: ", myAccount.balance);

// console.log("Depositing should succeed...");
// const t2 = new Deposit(9.99, myAccount);
// console.log("Commit result:", t2.commit());
// console.log("Account Balance: ", myAccount.balance);

// console.log("Withdrawal for 9.99 should be allowed...");
// const t3 = new Withdrawal(9.99, myAccount);
// console.log("Commit result:", t3.commit());

// console.log("Ending Account Balance: ", myAccount.balance);
// console.log("Lookings like I'm broke again");

// console.log("Account Transaction History: ", myAccount.transactions);
