
// OK
import pkg from 'casper-js-sdk';
const {
    CLValue, byteHash,
    Conversions, KeyTypeID, Key, HttpHandler, RpcClient
} = pkg;
import { ENDPOINT } from "../constants.js"
function concatTypedArrays(a, b) {
    // a, b TypedArray of same type
    var c = new a.constructor(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

const account_hash_str = "account-hash-038b1b200aa8cece02bdd191c4ce95074a3ea5b34ad473e43269c531d2048a54";
const package_hash_str = "hash-4eded98f9552618399f736ecbe6827fb0376a41ac550b046b56c3e153a8602fd"

const key_account = CLValue.newCLKey((
    Key.createByType(account_hash_str,
        KeyTypeID.Account
    )
));


const key_hash = CLValue.newCLKey((
    Key.createByType(package_hash_str,
        KeyTypeID.Hash

    )))


const concat_bytes = concatTypedArrays(key_account.bytes(), key_hash.bytes());

const blaked = byteHash(concat_bytes);

const dict_item_key = Conversions.encodeBase16(blaked);
console.log("allowance_item_key", dict_item_key);


const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);
const seed_uref = "uref-eff9ed8cb0aad3e1ffae7a38d696c7e03cde85a8bfc870aee1dbdc456fa67452-007"

const result = await rpcClient.getDictionaryItem(
    null, seed_uref, dict_item_key
);

console.log(JSON.stringify(result.storedValue.clValue))