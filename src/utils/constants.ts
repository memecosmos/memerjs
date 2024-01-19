import BigNumber from 'bignumber.js';

export class MemeNetworkConsts {

    static CURRENCY_DISPLAY_NAME = 'MEME';
    static CURRENCY_DENOM = 'umeme';
    static CURRENCY_DECIMALS = 6;
    static CURRENCY_COINGECKO_ID = 'meme-network';
    static CURRENCY_1_CUDO = new BigNumber(`1${'0'.repeat(MemeNetworkConsts.CURRENCY_DECIMALS)}`);

    static LEDGER_COIN_TYPE = 118;
    static BECH32_PREFIX_ACC_ADDR = 'meme';
    static BECH32_PREFIX_ACC_PUB = 'memepub';
    static BECH32_PREFIX_VAL_ADDR = 'memevaloper';
    static BECH32_PREFIX_VAL_PUB = 'memevaloperpub';
    static BECH32_PREFIX_CONS_ADDR = 'memevalcons';
    static BECH32_PREFIX_CONS_PUB = 'memevalconspub';
    static BECH32_ACC_ADDR_LENGTH = 44;
    static DEFAULT_GAS_MULTIPLIER = 1.3;

    static MESSAGE_TYPE_URL = '/gravity.v1.MsgSendToEth';

}

export const CURRENCY_DISPLAY_NAME = MemeNetworkConsts.CURRENCY_DISPLAY_NAME;
export const CURRENCY_DENOM = MemeNetworkConsts.CURRENCY_DENOM;
export const CURRENCY_DECIMALS = MemeNetworkConsts.CURRENCY_DECIMALS;
export const CURRENCY_COINGECKO_ID = MemeNetworkConsts.CURRENCY_COINGECKO_ID;
export const CURRENCY_1_CUDO = MemeNetworkConsts.CURRENCY_1_CUDO;

export const LEDGER_COIN_TYPE = MemeNetworkConsts.LEDGER_COIN_TYPE;
export const BECH32_PREFIX_ACC_ADDR = MemeNetworkConsts.BECH32_PREFIX_ACC_ADDR;
export const BECH32_PREFIX_ACC_PUB = MemeNetworkConsts.BECH32_PREFIX_ACC_PUB;
export const BECH32_PREFIX_VAL_ADDR = MemeNetworkConsts.BECH32_PREFIX_VAL_ADDR;
export const BECH32_PREFIX_VAL_PUB = MemeNetworkConsts.BECH32_PREFIX_VAL_PUB;
export const BECH32_PREFIX_CONS_ADDR = MemeNetworkConsts.BECH32_PREFIX_CONS_ADDR;
export const BECH32_PREFIX_CONS_PUB = MemeNetworkConsts.BECH32_PREFIX_CONS_PUB;
export const BECH32_ACC_ADDR_LENGTH = MemeNetworkConsts.BECH32_ACC_ADDR_LENGTH;
export const DEFAULT_GAS_MULTIPLIER = MemeNetworkConsts.DEFAULT_GAS_MULTIPLIER;
