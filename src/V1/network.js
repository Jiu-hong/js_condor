import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    Hash, CasperNetwork, TransactionHash,
} = pkg;


import { ENDPOINT, } from "../constants.js"


const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);


const TRANSACTION_HASH = Hash.fromHex("9bff61e4e119409eee9ae0565ee6a147f8fc8ddea221704d21318ba3b64e6984")
const DEPLOY_HASH = Hash.fromHex("215481282657a26010c4e169165c7064add3bf5000601e15257c4abb2fa54d41")
const myfunc = async () => {
    const network = await CasperNetwork.create(rpcClient)
    const transaction_hash = new TransactionHash(null, TRANSACTION_HASH)
    const deply_hash = new TransactionHash(DEPLOY_HASH, null)
    const result = await network.getTransaction(deply_hash)
    console.log("result:", JSON.stringify(result))
}

myfunc()


