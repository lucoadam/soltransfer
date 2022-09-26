const { Connection, Keypair, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, sendAndConfirmTransaction } = require("@solana/web3.js");
const bs58 = require( "bs58");

// connection
// const connection = new Connection("https://api.mainnet-beta.solana.com");
const connection = new Connection("https://api.devnet.solana.com");

// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
const sender = Keypair.fromSecretKey(
  bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
);

(async () => {
  let tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: new PublicKey("4MWwxzWsWmHrsbfPFwE6LDq471nqNeNMsD6DS7y8nruw"),
      lamports: 1 * LAMPORTS_PER_SOL, // sending 1 SOL
    })
  );
//   tx.feePayer = feePayer.publicKey;

  let txhash = await sendAndConfirmTransaction(connection, tx, [sender]);
  console.log(`txhash: ${txhash}`);
})();