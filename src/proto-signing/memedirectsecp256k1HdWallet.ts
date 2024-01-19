import { makeCosmoshubPath } from "@cosmjs/amino"
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions, } from "@cosmjs/proto-signing"
import { EnglishMnemonic } from "@cosmjs/crypto";
import { BECH32_PREFIX_ACC_ADDR } from "../utils";

const defaultMemeOptions: DirectSecp256k1HdWalletOptions = {
    bip39Password: "",
    hdPaths: [makeCosmoshubPath(0)],
    prefix: BECH32_PREFIX_ACC_ADDR,
}


interface DirectSecp256k1HdWalletConstructorOptions extends Partial<DirectSecp256k1HdWalletOptions> {
    readonly seed: Uint8Array;
  }
  

export class MemeDirectSecp256k1HdWallet extends DirectSecp256k1HdWallet {
    protected constructor(mnemonic: EnglishMnemonic, options: DirectSecp256k1HdWalletConstructorOptions) {
        super(mnemonic, options ?? defaultMemeOptions)
    }

    static override fromMnemonic(mnemonic: string, options?: Partial<DirectSecp256k1HdWalletOptions>): Promise<MemeDirectSecp256k1HdWallet> {
        return super.fromMnemonic(mnemonic, options ?? defaultMemeOptions)
    }
}