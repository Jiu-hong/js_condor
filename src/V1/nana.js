// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    Args, CLValue, CLTypePublicKey,
    PublicKey, ContractCallBuilder
} = pkg;

import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey_ed25519 } from "../utils.js"

const privateKey = getPrivateKey_ed25519(PRIVATE_KEY_PATH)
const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const publicKey = CLValue.newCLPublicKey(
    PublicKey.fromHex(
        '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
    )
)

const recipients = CLValue.newCLList(CLTypePublicKey, [
    publicKey
])
const args = Args.fromMap({
    recipients: recipients,
    amount: CLValue.newCLInt64('1000000000')
});

// 
const contractCall = new ContractCallBuilder()
    .byHash("61964050e1604057d530e8257a01a3615c073fe302b055015b12f10c744af0e7")
    .from(privateKey.publicKey)
    .entryPoint("initial_setting")
    .chainName(NETWORKNAME)
    .runtimeArgs(args)
    .ttl(DEFAULT_DEPLOY_TTL)
    .payment(2500000000);
// .payment(2_000_000_000);
const transaction = contractCall.build()
transaction.sign(privateKey);

console.log(JSON.stringify(transaction))
try {
    const result = await rpcClient.putTransaction(transaction);
    console.log(`Transaction Hash: ${result.transactionHash}`);
} catch (e) {
    console.error(e);
}