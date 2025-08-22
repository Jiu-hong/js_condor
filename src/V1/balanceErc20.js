
// OK
import pkg from 'casper-js-sdk';
const {
    CLValue,
    Conversions, KeyTypeID, Key, HttpHandler, RpcClient
} = pkg;
import { ENDPOINT } from "../constants.js"

const account_hash_str = "account-hash-038b1b200aa8cece02bdd191c4ce95074a3ea5b34ad473e43269c531d2048a54";
const package_hash_str = "hash-d7012fda9e9cdaeec9e9dad9fd2234f39bd0d57702cbcff7310c5d2e277be767"

// for account key
const key_account = CLValue.newCLKey((
    Key.createByType(account_hash_str,
        KeyTypeID.Account
    )
));

// for hash key
const key_hash = CLValue.newCLKey((
    Key.createByType(package_hash_str,
        KeyTypeID.Hash

    )))


const dict_item_key = Conversions.encodeBase64(key_account.bytes());
console.log("balance_item_key", dict_item_key);


// const rpcHandler = new HttpHandler(ENDPOINT);
// const rpcClient = new RpcClient(rpcHandler);
// const seed_uref = "uref-099ed0900bf2da6f14a0e6177c87e6d8cd8fe1b834f518de59324f3b82ecadeb-007"

// const result = await rpcClient.getDictionaryItem(
//     null, seed_uref, dict_item_key
// );

// console.log(JSON.stringify(result.storedValue.clValue))