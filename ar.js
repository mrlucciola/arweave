const key1 = require("./arweave-keyfile--RN9JVelub1Q7WgxRPAlQVz-wNMM18LeCYByDB2XyCQ.json");
const key2 = require("./arweave-keyfile-kVgP4ULecElu2ph7u1V4i5F9VyhZK1ohvKNf-T3Q5Ms.json");
const Arweave = require("arweave");

// If you want to connect directly to a node
// const arweave = Arweave.init({
//   host: "https://arweave.net",
//   port: 1984,
//   protocol: "https",
// });

// Or to specify a gateway when running from NodeJS you might use
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

// arweave.wallets.jwkToAddress(key1).then((address) => {
//   console.log(address);
//   //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
// });

const main = async () => {
  // init addresses
  const address1 = await arweave.wallets.jwkToAddress(key1);
  const address2 = await arweave.wallets.jwkToAddress(key2);

  console.log("address1address1", address1);
  console.log("address2address2", address2);

  // init txn objects
  const transactionA = await arweave.createTransaction(
    {
      quantity: 100000000000,
      target: address2,
    },
    key1
  );
  // transactionA.setSignature()
  // console.log("before transactionAtransactionA", transactionA);
  
  await arweave.transactions.sign(transactionA, key1);
  console.log(transactionA)

  const response = await arweave.transactions.post(transactionA);
  console.log('\n\n response', response);
};
main();
