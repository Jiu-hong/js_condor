// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    Args, CLValue,
    PublicKey, ContractCallBuilder
} = pkg;

import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)
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

// 
const contractCall = new ContractCallBuilder()
    .byHash("04a72fd4cf61104a72b43bdd795a4a336c6e0afc61023abe03f23beb0e45c155")
    .from(privateKey.publicKey)
    .entryPoint("apple")
    .chainName(NETWORKNAME)
    .runtimeArgs(args)
    .ttl(DEFAULT_DEPLOY_TTL)
    .payment(2_000_000_000);
const transaction = contractCall.buildFor1_5()
transaction.sign(privateKey);
try {
    const result = await rpcClient.putDeploy(transaction.getDeploy());
    console.log(`Deploy Hash: ${JSON.stringify(result.deployHash)}`);
} catch (e) {
    console.error(e);
}