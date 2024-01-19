import * as nftMsgTypes from "../stargate/modules/nft/types"
import * as gravityMsgTypes from "../stargate/modules/gravity/types"
import * as groupMsgTypes from "../stargate/modules/group/types"
import * as cosmosDefMsgTypes from "../stargate/modules/cosmos/types"
import { EncodeObject, GeneratedType, TsProtoGeneratedType } from "@cosmjs/proto-signing"
import { Method } from "@cosmjs/tendermint-rpc"
 

const MsgTypesMap: any = {
    ...nftMsgTypes,
    ...gravityMsgTypes,
    ...groupMsgTypes,
    ...cosmosDefMsgTypes
}

type msgTypesMapType = typeof MsgTypesMap

type IMsg<T extends keyof msgTypesMapType> = {
    typeUrl: string;
    value: msgTypesMapType[T]["type"]
}


// A Factory for generating messages
export function generateMsg< T extends keyof msgTypesMapType, K extends ReturnType<msgTypesMapType[T]["type"]["fromPartial"]>> 
(msgName: T, params: K ):EncodeObject {
    
    const msg:IMsg<T> = {
        typeUrl:MsgTypesMap[msgName].typeUrl ,
        value: MsgTypesMap[msgName].type.fromPartial({
            // @ts-ignore
                ...params
            })
    }

    return msg
}