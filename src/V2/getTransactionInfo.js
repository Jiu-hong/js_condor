// ok
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
} = pkg
import { ENDPOINT } from "../constants.js"

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);
const TRANSACTION_HASH = "f8a65cbbbc24228052388bd2f602b1f9342c791c4f205faacc7934afd2a355f9"
const result = await rpcClient.getTransactionByTransactionHash(
    TRANSACTION_HASH
);

console.log(JSON.stringify(result))


