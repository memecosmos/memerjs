import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Coin } from "@cosmjs/amino";
import { CURRENCY_DENOM } from "../utils";

export class MemeCosmWasmClient extends CosmWasmClient {

    public static override async connect(endpoint: string): Promise<MemeCosmWasmClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new MemeCosmWasmClient(tmClient);
      }

      protected constructor(tmClient: Tendermint34Client | undefined) {
        super(tmClient);
      }
    
      public override async getBalance(address: string, searchDenom: string = CURRENCY_DENOM): Promise<Coin> {
        return this.forceGetQueryClient().bank.balance(address, searchDenom);
      }
}
