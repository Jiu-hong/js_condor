// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    SessionBuilder,
    Args,
    CLValue, Hash,
    PublicKey, URef, Conversions, UrefAccess, Key, KeyTypeID, CLTypeUInt32, CLTypeString, CLTypeInt32, CLTypeMap, CLValueMap
} = pkg;


import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getBinary, getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)

const PATH_TO_CONTRACT = "/mnt/ebs_volume/ca/js_condor/wasm/contract.wasm"

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
const formattedStr =
    'uref-0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20-000';
const myURef = URef.fromString(formattedStr);

// const mapType = new CLTypeMap(CLTypeString, CLTypeInt32);
// const clValue = new CLValue(mapType);
// clValue.map = new CLValueMap(mapType);

const args = Args.fromMap({
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
    // key_uref NG
    key_uref: CLValue.newCLKey((
        Key.createByType(
            "uref-0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20-000",
            KeyTypeID.URef

        ))),
    // transfer-0404040404040404040404040404040404040404040404040404040404040404
    key_Transfer: CLValue.newCLKey((
        Key.createByType("transfer-0404040404040404040404040404040404040404040404040404040404040404",
            KeyTypeID.Transfer

        ))),
    // deploy-0505050505050505050505050505050505050505050505050505050505050505"
    key_deploy: CLValue.newCLKey((
        Key.createByType("deploy-0505050505050505050505050505050505050505050505050505050505050505",
            KeyTypeID.DeployInfo

        ))),

    // era-42
    key_eraid: CLValue.newCLKey((
        Key.createByType("era-42",
            KeyTypeID.EraId

        ))),
    // system-entity-registry-0000000000000000000000000000000000000000000000000000000000000000
    key_SystemContractRegistry: CLValue.newCLKey((
        Key.createByType("0000000000000000000000000000000000000000000000000000000000000000",
            KeyTypeID.SystemContractRegistry

        ))),
    // era-summary-0000000000000000000000000000000000000000000000000000000000000000
    key_EraSummary: CLValue.newCLKey((
        Key.createByType("0000000000000000000000000000000000000000000000000000000000000000",
            KeyTypeID.EraSummary

        ))),
    // package-0000000000000000000000000000000000000000000000000000000000000000
    key_Package: CLValue.newCLKey((
        Key.createByType("package-0000000000000000000000000000000000000000000000000000000000000000",
            KeyTypeID.Package

        ))),
    // bid-306633f962155a7d46658adb36143f28668f530454fe788c927cecf62e5964a1
    key_bid: CLValue.newCLKey((
        Key.createByType("bid-306633f962155a7d46658adb36143f28668f530454fe788c927cecf62e5964a1",
            KeyTypeID.Bid

        ))),

    // unbond-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a
    key_Unbond: CLValue.newCLKey((
        Key.createByType("unbond-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a",
            KeyTypeID.Unbond

        ))),
    // withdraw-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a
    key_withdraw: CLValue.newCLKey((
        Key.createByType("withdraw-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a",
            KeyTypeID.Withdraw

        ))),
    // "bid-addr-00306633f962155a7d46658adb36143f28668f530454fe788c927cecf62e5964a1"
    key_BidAddr: CLValue.newCLKey((
        Key.createByType("bid-addr-00306633f962155a7d46658adb36143f28668f530454fe788c927cecf62e5964a1",
            KeyTypeID.BidAddr

        ))),
    // key_bid_addr: CLValue.newCLKey((
    //     Key.createByType("bid-addr-03da3cd8cc4c8f34e7731583e67ddc211ff9b5c3f2c52640582415c2cce9315b2a8af7b77811970792f98b806779dfc0d1a9fef5bad205c6be8bb884210d7d323c",
    //         KeyTypeID.BidAddr

    //     ))),
    // //    "bid-addr-03da3cd8cc4c8f34e7731583e67ddc211ff9b5c3f2c52640582415c2cce9315b2a8af7b77811970792f98b806779dfc0d1a9fef5bad205c6be8bb884210d7d323c")

    // dictionary-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a
    key_dictionary: CLValue.newCLKey((
        Key.createByType("dictionary-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a",
            KeyTypeID.Dictionary

        ))),

    // "balance-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a"
    key_Balance: CLValue.newCLKey((
        Key.createByType("balance-2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a",
            KeyTypeID.Balance

        ))),
    // chainspec-registry-0000000000000000000000000000000000000000000000000000000000000000
    key_ChainspecRegistry: CLValue.newCLKey((
        Key.createByType("chainspec-registry-0000000000000000000000000000000000000000000000000000000000000000",
            KeyTypeID.ChainspecRegistry

        ))),
    // "checksum-registry-0000000000000000000000000000000000000000000000000000000000000000"
    key_ChecksumRegistry: CLValue.newCLKey((
        Key.createByType("checksum-registry-0000000000000000000000000000000000000000000000000000000000000000",
            KeyTypeID.ChecksumRegistry

        ))),
    // "balance-hold-002a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a0000000000000000"
    key_BalanceHold: CLValue.newCLKey((
        Key.createByType("balance-hold-002a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a0000000000000000",
            KeyTypeID.BalanceHold

        ))),
    // named-key-
    // key_NamedKey: CLValue.newCLKey((
    //     Key.createByType("entity-contract-d8e3cc0714f62ce65700db9f533936827cdc8aaa01959e14d68c0239fa78376e",
    //         KeyTypeID.NamedKey
    //     ))),

    // public option?: CLValueOption;

    // public result?: CLValueResult;
    // public static newCLResult(
    //     innerOk: CLType,
    //     innerErr: CLType,
    //     value: CLValue,
    //     isSuccess: boolean
    //   )
    result: CLValue.newCLResult(CLTypeString, CLTypeInt32, CLValue.newCLString('ABC'), true),
});

const sessionWasm = new SessionBuilder()
    .from(privateKey.publicKey)
    .chainName(NETWORKNAME)
    .payment(2_500_000_000)
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

