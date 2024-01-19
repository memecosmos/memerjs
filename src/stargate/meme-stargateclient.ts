import { IndexedTx, StargateClient, StargateClientOptions } from '@cosmjs/stargate';
import { HttpEndpoint, Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { GroupQueryClient } from './modules/group/clients/queryClient';
import { NFTQueryClient } from './modules/nft/clients/queryClient';
import { GravityQueryClient } from './modules/gravity/clients/queryClient';
import { MarketplaceQueryClient } from './modules/marketplace/clients/queryClient';
import { AddressbookQueryClient } from './modules/addressbook/clients/queryClient';
import { getFullRegistry } from './full-registry';

import { DecodedTxRaw, decodeTxRaw, Registry } from '@cosmjs/proto-signing';


export class MemeStargateClient extends StargateClient {
    private readonly groupQueryClient: GroupQueryClient;
    private readonly nftQueryClient: NFTQueryClient;
    private readonly gravityQueryClient: GravityQueryClient;
    private readonly marketplaceQueryClient: MarketplaceQueryClient;
    private readonly addressbookQueryClient: AddressbookQueryClient;
    public readonly  registry: Registry


    public static override async connect(
        endpoint: string | HttpEndpoint,
        options: StargateClientOptions = {}
    ): Promise<MemeStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new MemeStargateClient(tmClient, options);
    }

    protected constructor(tmClient: Tendermint34Client, options: StargateClientOptions) {
        super(tmClient, options);
        this.groupQueryClient = new GroupQueryClient(tmClient)
        this.nftQueryClient =  new NFTQueryClient(tmClient)
        this.gravityQueryClient = new GravityQueryClient(tmClient)
        this.marketplaceQueryClient = new MarketplaceQueryClient(tmClient)
        this.addressbookQueryClient = new AddressbookQueryClient(tmClient)
        this.registry = getFullRegistry()
    }

    get groupModule (): GroupQueryClient{
        return this.groupQueryClient
    }

    get nftModule (): NFTQueryClient{
        return this.nftQueryClient
    }

    get gravityModule (): GravityQueryClient{
        return this.gravityQueryClient
    }

    get marketplaceModule(): MarketplaceQueryClient {
        return this.marketplaceQueryClient
    }

    get addressbookModule(): AddressbookQueryClient {
        return this.addressbookQueryClient
    }

    public async decodeQryResponse(resp: IndexedTx){
        const respCopy:any = {...resp}
        // Decoding the Trx
        const decodedTx:DecodedTxRaw = decodeTxRaw(respCopy.tx)
        // Decoding each message in the transaction
        for(let i =0; i< decodedTx.body.messages.length; i++){
            decodedTx.body.messages[i] = this.registry.decode(decodedTx.body.messages[i])
        }
        respCopy.tx = decodedTx 

        return respCopy
    }
    
}