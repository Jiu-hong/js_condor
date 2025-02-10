// ok
import pkg from 'casper-js-sdk';
const { HttpHandler,
  RpcClient,
} = pkg
import { ENDPOINT } from "../constants.js"

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);
const DEPLOY_HASH = "e42181f5e036e5be0e389a72a4fc63b2e8049faa8026c665e7094cb50705127a"
const result = await rpcClient.getTransactionByDeployHash(
  DEPLOY_HASH
);

console.log(JSON.stringify(result))


