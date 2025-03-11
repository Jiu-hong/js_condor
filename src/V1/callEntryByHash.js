// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    Args, CLValue, Key, KeyTypeID,
    PublicKey, ContractCallBuilder
} = pkg;

import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)
const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const args = Args.fromMap({
    recipient: CLValue.newCLKey(
        Key.createByType(
            PublicKey.newPublicKey(
                '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
            )
                .accountHash()
                .toPrefixedString(),
            KeyTypeID.Account
        )
    ),
    amount: CLValue.newCLUInt256('1000000000')
});

// 
const contractCall = new ContractCallBuilder()
    .byHash("1ba73c6ea0ea6717779ee14ce351b30de34f28e10df1aafb304c4a6668a309df")
    .from(privateKey.publicKey)
    .entryPoint("apple")
    .chainName(NETWORKNAME)
    .runtimeArgs(args)
    .ttl(DEFAULT_DEPLOY_TTL)
    .payment(0);
// .payment(2_000_000_000);
const transaction = contractCall.build()
transaction.sign(privateKey);
try {
    const result = await rpcClient.putTransaction(transaction);
    console.log(`Transaction Hash: ${result.transactionHash}`);
} catch (e) {
    console.error(e);
}