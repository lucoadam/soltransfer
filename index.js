#!/usr/bin/env node

const yargs = require("yargs");
const { tokenTransfer } = require("./tokentransfer");
const { solanaTransfer } = require("./soltransfer");

const options = yargs.usage("Usage: -t <name>").option("n", {
  alias: "name",
  describe: "Transfer name (solana or token)",
  type: "string",
  demandOption: true,
}).argv;

if (options.name === "solana") {
  console.log("Transfering solana!");
  (async () => {
    try {
      await solanaTransfer();
    } catch (e) {
      console.log("Failed to transfer solana");
    }
  })();
} else if (options.name === "token") {
  console.log("Transferring token!");
  (async () => {
    try {
      await tokenTransfer();
    } catch (e) {
      console.log("Failed to transfer token");
    }
  })();
} else {
  console.log("Sorry incorrect choice!");
}
