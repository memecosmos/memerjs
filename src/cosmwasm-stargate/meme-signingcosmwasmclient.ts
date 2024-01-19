import { SigningCosmWasmClient, SigningCosmWasmClientOptions } from "@cosmjs/cosmwasm-stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Cw20Module } from "./modules/cw20";

export class MemeSigningCosmWasmClient extends SigningCosmWasmClient {
    public readonly Cw20Module: Cw20Module;

    public static override async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
      ): Promise<MemeSigningCosmWasmClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new MemeSigningCosmWasmClient(tmClient, signer, options);
      }

      public static override async offline(
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
      ): Promise<MemeSigningCosmWasmClient> {
        return new MemeSigningCosmWasmClient(undefined, signer, options);
      }

      protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions,
      ) {
        super(tmClient, signer, options);
        this.Cw20Module = new Cw20Module();
      }

}