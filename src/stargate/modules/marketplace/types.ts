import { MsgCreateCollection, MsgPublishCollection, MsgPublishNft,
        MsgBuyNft, MsgUpdateRoyalties, MsgUpdatePrice,
        MsgRemoveNft, MsgVerifyCollection, MsgUnverifyCollection,
        MsgMintNft, MsgAddAdmin, MsgRemoveAdmin } from './proto-types/tx';

const PREFIX = '/cudoventures.memenode.marketplace.';

export const msgCreateCollection = {
    typeUrl: PREFIX.concat('MsgCreateCollection'),
    type: MsgCreateCollection
};

export const msgPublishCollection = {
    typeUrl: PREFIX.concat('MsgPublishCollection'),
    type: MsgPublishCollection
};

export const msgPublishNft = {
    typeUrl: PREFIX.concat('MsgPublishNft'),
    type: MsgPublishNft
};

export const msgBuyNft = {
    typeUrl: PREFIX.concat('MsgBuyNft'),
    type: MsgBuyNft
};

export const msgUpdateRoyalties = {
    typeUrl: PREFIX.concat('MsgUpdateRoyalties'),
    type: MsgUpdateRoyalties
};

export const msgUpdatePrice = {
    typeUrl: PREFIX.concat('MsgUpdatePrice'),
    type: MsgUpdatePrice
};

export const msgRemoveNft = {
    typeUrl: PREFIX.concat('MsgRemoveNft'),
    type: MsgRemoveNft
};

export const msgVerifyCollection = {
    typeUrl: PREFIX.concat('MsgVerifyCollection'),
    type: MsgVerifyCollection
};

export const msgUnverifyCollection = {
    typeUrl: PREFIX.concat('MsgUnverifyCollection'),
    type: MsgUnverifyCollection
};

export const msgMintNft = {
    typeUrl: PREFIX.concat('MsgMintNft'),
    type: MsgMintNft
};

export const msgAddAdmin = {
    typeUrl: PREFIX.concat('MsgAddAdmin'),
    type: MsgAddAdmin
};

export const msgRemoveAdmin = {
    typeUrl: PREFIX.concat('MsgRemoveAdmin'),
    type: MsgRemoveAdmin
};