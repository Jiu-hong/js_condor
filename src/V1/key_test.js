// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    Args, CLValue, Key, KeyTypeID,
    PublicKey, ContractCallBuilder
} = pkg;

import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey_ed25519, getPrivateKey_secp256k1 } from "../utils.js"

const privateKey = getPrivateKey_secp256k1(PRIVATE_KEY_PATH)

const pk = privateKey.publicKey
console.log("pk:", pk)
//mine
// const tx = "6236f5022240575bcd2416d933c084812ebbbea433a12940826661244230e101"  //NG
const tx = "95a493b3fe9ad537acb2e886001b63435603dea2293b7b7a3a7ee22bc5ad3f4a"
// const a = Uint8Array.fromHex()
const hex = Uint8Array.from(Buffer.from(tx, 'hex'));
const sig = privateKey.sign(hex)
const backToHexString = Buffer.from(sig).toString('hex');
console.log("sig is:", backToHexString)
// expect
// 02430c638fb8cfa543c886f7fb06c1a5ec703f151ee6dde5932f76b7c69295fcb2c42092956d314ae1779500f65fbfcd19f6eca66c1d55abb271516e5a90e01603