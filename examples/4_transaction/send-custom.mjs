import { DirectSecp256k1HdWallet } from "memerjs";
import { assertIsBroadcastTxSuccess, SigningCosmWasmClient } from "memerjs";
import * as cfg  from 'dotenv';
  
cfg.config(); 
const mnemonic = "measure gym country square thunder tunnel symptom fade sausage midnight skate fox among middle quit castle profit always primary spring regret oppose board elegant";
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
const sendMsg = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: senderAddress,
      toAddress: recipientAddress,
      amount: [...amount],
    },
  };

const result = await client.signAndBroadcast(senderAddress, [sendMsg], fee, "Have fun with your star coins");
assertIsBroadcastTxSuccess(result);
console.log("You have successfully send meme!");