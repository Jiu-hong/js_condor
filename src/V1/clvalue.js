// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    SessionBuilder,
    Args, CLValueParser, CLTypeOption, CLTypeUInt64,
    CLValue, Hash, CLTypeBool,
    PublicKey, URef, Conversions, UrefAccess, Key, KeyTypeID, CLTypeUInt32, CLTypeString, CLTypeInt32, CLTypeMap, CLValueMap
} = pkg;


import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getBinary, getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)

const PATH_TO_CONTRACT = "contract.wasm"

// get private key fromHex, fromPem or generate it

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);
// public type: CLType;

const urefAddr =
    '82b8d9d116ba28897f000a4d053b7a27bbc3813e1409e92ecf866717cab88546';
const RWExampleURef = new URef(
    Conversions.decodeBase16(urefAddr),
    UrefAccess.ReadAddWrite
);
const myKey = CLValue.newCLString('ABC');
const myVal = CLValue.newCLInt32(10);
const clValueMap = CLValue.newCLMap(CLTypeString, CLTypeInt32);
clValueMap.map?.append(myKey, myVal);
clValueMap.map?.append(myKey, myVal);
const formattedStr =
    'uref-0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20-000';
const myURef = URef.fromString(formattedStr);

// const mapType = new CLTypeMap(CLTypeString, CLTypeInt32);
// const clValue = new CLValue(mapType);
// clValue.map = new CLValueMap(mapType);

const resultOk = CLValue.newCLResult(CLTypeBool, CLTypeInt32, CLValue.newCLInt32(123), false)
const option2 = CLValue.newCLOption(resultOk)

const args = Args.fromMap({
    option2: option2,
    bool: CLValue.newCLValueBool(true),
    // // i32: CLValueInt32;
    i32: CLValue.newCLInt32(123),
    // // public i64?: CLValueInt64;
    i64: CLValue.newCLInt64(123),
    // // public ui8?: CLValueUInt8;
    u8: CLValue.newCLUint8(123),
    // public ui32?: CLValueUInt32;
    u32: CLValue.newCLUInt32(123),
    // public ui64?: CLValueUInt64;
    u64: CLValue.newCLUint64(123),
    // public ui128?: CLValueUInt128;
    u128: CLValue.newCLUInt128(123),
    // public ui256?: CLValueUInt256;
    u256: CLValue.newCLUInt256(123),
    // public ui512?: CLValueUInt512;
    u512: CLValue.newCLUInt512(123),
    // public unit?: CLValueUnit;
    unit: CLValue.newCLUnit(),
    // public uref?: URef;
    uref: CLValue.newCLUref(RWExampleURef),
    // public key?: Key;
    key_account: CLValue.newCLKey((
        Key.createByType(
            PublicKey.fromHex(
                '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
            )
                .accountHash()
                .toPrefixedString(),
            KeyTypeID.Account
        )
    )),
    key_Hash: CLValue.newCLKey((
        Key.createByType("453a0fbd85f5f7b8c9154ba8b25b4f33c611746b23db81e9ebf385b5e47b6baf", KeyTypeID.Hash
        ))),
    key_uref: CLValue.newCLKey((
        Key.createByType(
            myURef
                .toPrefixedString(),
            KeyTypeID.URef

        ))),
    // public option?: CLValueOption;
    option: CLValue.newCLOption(CLValue.newCLUint64(3)),
    // public list?: CLValueList;
    list: CLValue.newCLList(CLTypeUInt32, [
        CLValue.newCLUInt32(1),
        CLValue.newCLUInt32(2),
        CLValue.newCLUInt32(3),
        CLValue.newCLUInt32(3),
        CLValue.newCLUInt32(3)
    ]),
    list2: CLValue.newCLList(new CLTypeOption(CLTypeUInt64), [
        CLValue.newCLOption(CLValue.newCLUint64(1)),
        CLValue.newCLOption(CLValue.newCLUint64(2)),
        CLValue.newCLOption(CLValue.newCLUint64(3)),
        CLValue.newCLOption(CLValue.newCLUint64(3)),
        CLValue.newCLOption(CLValue.newCLUint64(3))
    ]),
    // public byteArray?: CLValueByteArray;
    byteArray: CLValue.newCLByteArray(Uint8Array.from([1, 2, 3])),
    // public result?: CLValueResult;
    // public static newCLResult(
    //     innerOk: CLType,
    //     innerErr: CLType,
    //     value: CLValue,
    //     isSuccess: boolean
    //   )
    resultOk: CLValue.newCLResult(CLTypeBool, CLTypeInt32, CLValue.newCLInt32(123), false),
    resultErr: CLValue.newCLResult(CLTypeString, CLTypeBool, CLValue.newCLString('ABC'), true),
    // public stringVal?: CLValueString;
    stringVal: CLValue.newCLString('ABC'),
    // public map?: CLValueMap;
    map: clValueMap, //?????
    // public tuple1?: CLValueTuple1;
    tuple1: CLValue.newCLTuple1(CLValue.newCLValueBool(false)),
    // public tuple2?: CLValueTuple2;
    tuple2: CLValue.newCLTuple2(CLValue.newCLValueBool(false), CLValue.newCLString('ABC')),
    // public tuple3?: CLValueTuple3;
    tuple3: CLValue.newCLTuple3(CLValue.newCLInt32(555),
        CLValue.newCLString('ABC'),
        CLValue.newCLString('XYZ')),
    option1: CLValue.newCLOption(CLValue.newCLTuple3(CLValue.newCLInt32(555),
        CLValue.newCLString('ABC'),
        CLValue.newCLString('XYZ'))),
    option11: CLValue.newCLOption(null, CLTypeUInt64),
    // public any?: CLValueAny;
    any: CLValue.newCLAny(new Uint8Array([13, 13])),
    // public publicKey?: PublicKey;
    PublicKey: CLValue.newCLPublicKey(
        PublicKey.fromHex(
            '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
        )
    ),
});


const sessionWasm = new SessionBuilder()
    .from(privateKey.publicKey)
    .chainName(NETWORKNAME)
    .payment(3_000_000_000)
    .ttl(DEFAULT_DEPLOY_TTL)
    .wasm(getBinary(PATH_TO_CONTRACT))
    .installOrUpgrade()
    .runtimeArgs(args);
const transaction = sessionWasm.build()
transaction.sign(privateKey);
console.log(JSON.stringify(transaction))
try {
    const result = await rpcClient.putTransaction(transaction);
    console.log(`Transaction Hash: ${result.transactionHash}`);
} catch (e) {
    console.error(e);
}


// contract-package-8750d8ea348825c2f4ac7ac65885660586269656eb1f0ef7a277a884058005e0

