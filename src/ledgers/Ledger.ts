import BigNumber from 'bignumber.js';
import { StdSignature } from '../amino';
import { OfflineSigner } from '../proto-signing';

type AddressChangeCallback = (address: string) => void;

export abstract class Ledger {

    connected: boolean = false;
    accountAddress: string | null = null;
    offlineSigner: OfflineSigner | null = null;

    addressChangeCallbacks: AddressChangeCallback[] = [];

    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract getBalance(): Promise<BigNumber>;
    abstract isConnected(): boolean;
    abstract isLedgerExtensionPresent(): boolean;
    abstract signArbitrary(chainId: string, address: string, data: string | Uint8Array): Promise<StdSignature>;

    constructor() {
    }

    init() {
        this.connected = false;
        this.accountAddress = null;
        this.offlineSigner = null;
        this.addressChangeCallbacks = [];
    }

    addAddressChangeCallback(callback: (address: string) => void) {
        this.addressChangeCallbacks.push(callback);
    }

    removeAddressChangeCallback(callback: (address: string) => void) {
        this.addressChangeCallbacks = this.addressChangeCallbacks.filter((func: (address: string) => void) => func === callback);
    }
}
