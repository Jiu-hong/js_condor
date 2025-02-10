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
    .byHash("48225a9815071f611fbdad400a04839077f71be4b9a3ea357feffa164a509cb6")
    .from(privateKey.publicKey)
    .entryPoint("apple")
    .chainName(NETWORKNAME)
    .runtimeArgs(args)
    .ttl(DEFAULT_DEPLOY_TTL)
    .payment(2_000_000_000);
const transaction = contractCall.build()
transaction.sign(privateKey);
try {
    const result = await rpcClient.putTransaction(transaction);
    console.log(`Transaction Hash: ${result.transactionHash}`);
} catch (e) {
    console.error(e);
}