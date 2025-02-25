import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    SessionBuilder,
    Args,
    CLValue, Key, KeyTypeID
} = pkg;


import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getBinary, getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)

const PATH_TO_CONTRACT = "/mnt/ebs_volume/ca/js_condor/wasm/contract.wasm"

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const args = Args.fromMap({
    // key_uref NG
    key_uref: CLValue.newCLKey((
        Key.createByType(
            "uref-9c8853de3bd1ebc9a5154a0667d5a3d3a57210ae7f2312a696d64ae01b228850-000",
            KeyTypeID.URef

        ))),
    // era-42
    key_eraid: CLValue.newCLKey((
        Key.createByType("era-42",
            KeyTypeID.EraId

        ))),
});

const sessionWasm = new SessionBuilder()
    .from(privateKey.publicKey)
    .chainName(NETWORKNAME)
    .payment(1_000_000_000)
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