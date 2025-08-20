
// OK
import { BigNumber } from '@ethersproject/bignumber';
import pkg from 'casper-js-sdk';
const { HttpHandler, Hash,
    RpcClient,
    SessionBuilder, CLTypeUInt64,
    Args,
    CLValue,
    PublicKey, NamedArg, TransactionV1Payload, Duration,
    Timestamp, PaymentLimitedMode,
    Transaction,
    TransactionV1,
    InitiatorAddr,
    FixedMode,
    PricingMode,
    KeyAlgorithm,
    PrivateKey, newCLUInt32, CLTypeBool, CLTypeInt32,
    CLTypeUInt32, CLTypeOption,
    SessionTarget,
    TransactionRuntime,
    TransactionTarget,
    TransactionEntryPoint,
    TransactionEntryPointEnum, StoredTarget,
    TransactionScheduling, toBytesU32, toBytesU16,

    CLValueParser,
    NativeTransferBuilder, byteHash,
    Conversions, KeyTypeID, Key, AccountHash
} = pkg;

function concatTypedArrays(a, b) {
    // a, b TypedArray of same type
    var c = new a.constructor(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

const account_hash_str = "account-hash-038b1b200aa8cece02bdd191c4ce95074a3ea5b34ad473e43269c531d2048a54";


const key_account = CLValue.newCLKey((
    Key.createByType(
        AccountHash.fromString(account_hash_str)
            .toPrefixedString(),
        KeyTypeID.Account
    )
));

console.log("key_account", key_account)

const key_hash = CLValue.newCLKey((
    Key.createByType("hash-4eded98f9552618399f736ecbe6827fb0376a41ac550b046b56c3e153a8602fd",
        KeyTypeID.Hash

    )))

const concat_bytes = concatTypedArrays(key_account.bytes(), key_hash.bytes());

const blaked = byteHash(concat_bytes);

const dict_item_key = Conversions.encodeBase16(blaked);
console.log("allowance_item_key", dict_item_key);