import { DirectSecp256k1HdWallet } from "memerjs";
import { assertIsBroadcastTxSuccess, SigningCosmWasmClient } from "memerjs";
import * as cfg  from 'dotenv';
  
cfg.config(); 
const mnemonic = process.env.MNEMONIC;
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
const [firstAccount] = await wallet.getAccounts();
const client = await SigningCosmWasmClient.connectWithSigner(process.env.NODE_URL, wallet);
const amount = {
  denom: "umeme",
  amount: "1.2.167",
};
const fee = {
    amount: [ {denom: "umeme", amount: "123"}],
    gas: "100000"
}
const result = await client.sendTokens(firstAccount.address, process.env.ADDRESS, [amount], fee, "Have fun with your star coins");
assertIsBroadcastTxSuccess(result);
console.log("You have successfully send meme!");