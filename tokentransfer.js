const {
  Keypair,
  Transaction,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  clusterApiUrl,
} = require("@solana/web3.js");
const {
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  transfer,
} = require("@solana/spl-token");
const bs58 = require("bs58");

// connection
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// for mainnet use:
//const connection = new Connection("https://api.mainnet-beta.solana.com");
const amount = 10
const tokenAddress = "2iB2oZaJZZBCmMecrz79wrMdu6Zn5UA2apUYdVy4jJUD";

const sender = Keypair.fromSecretKey(
  bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
);

const toAddress = "22fY53fd1PYwh8ZJS2iEwH72s6P1cT8oFjcSpp5atczv";

const fromPublicKey = sender.publicKey;
const toPublicKey = new PublicKey(toAddress);

const tokenPublicKey = new PublicKey(tokenAddress);

(async () => {
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromPublicKey,
    tokenPublicKey,
    fromPublicKey,
  );
  console.log(fromTokenAccount.address);
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromPublicKey,
    tokenPublicKey,
    toPublicKey,
  );
  const data = await connection.getParsedAccountInfo(fromTokenAccount.address);
  console.log(data.value.data.parsed.info.tokenAmount);
  console.log(toTokenAccount.address);

  const transfer1 = await transfer(
    connection,
    sender,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromPublicKey, // or pass fromPublicKey
    amount * Math.pow(10, data.value.data.parsed.info.tokenAmount.decimals) // data.value.data.parsed.info.tokenAmount.amount
  );
  console.log("transaction hash", transfer1);
})();
