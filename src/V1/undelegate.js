// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    NativeUndelegateBuilder,
    PrivateKey, PublicKey,
    KeyAlgorithm
} = pkg;

import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey } from "../utils.js"

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)
const transaction = new NativeUndelegateBuilder()
    .validator(PublicKey.fromHex(
        '011d86fcc3e438fcb47d4d9af77e9db97ca1c322c3e87d5a4ea6f3386b9ddcd6ed'))
    .from(privateKey.publicKey)
    .amount('1063614466233')
    .chainName(NETWORKNAME)
    .payment(2_500_000_000)
    .ttl(DEFAULT_DEPLOY_TTL)
    .build();
console.log(JSON.stringify(transaction))

transaction.sign(privateKey);

try {
    const result = await rpcClient.putTransaction(transaction);
    console.log(`Transaction Hash: ${result.transactionHash}`);
} catch (e) {
    console.error(e);
}