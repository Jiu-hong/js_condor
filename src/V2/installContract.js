// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    SessionBuilder,
    Args,
    CLValue,
    PublicKey
} = pkg;


import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getBinary, getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)

const PATH_TO_CONTRACT = "/mnt/ebs_volume/ca/js_condor/wasm/contract.wasm"

// get private key fromHex, fromPem or generate it

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);
const args = Args.fromMap({
    target: CLValue.newCLPublicKey(
        PublicKey.fromHex(
            '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
        )
    ),
    amount: CLValue.newCLUInt512('000'),
    id: CLValue.newCLOption(CLValue.newCLUint64(3))
});

const sessionWasm = new SessionBuilder()
    .from(privateKey.publicKey)
    .chainName(NETWORKNAME)
    .payment(200_000_000_000)
    .ttl(DEFAULT_DEPLOY_TTL)
    .wasm(getBinary(PATH_TO_CONTRACT))
    .installOrUpgrade()
    .runtimeArgs(args);
const transaction = sessionWasm.build()
transaction.sign(privateKey);
console.log(JSON.stringify(transaction))
// try {
//     const result = await rpcClient.putTransaction(transaction);
//     console.log(`Transaction Hash: ${result.transactionHash}`);
// } catch (e) {
//     console.error(e);
// }


// contract-package-8750d8ea348825c2f4ac7ac65885660586269656eb1f0ef7a277a884058005e0

