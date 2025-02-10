// ok
import pkg from 'casper-js-sdk';
const {
  HttpHandler,
  RpcClient,
  makeCsprTransferDeploy
} = pkg;

import { ENDPOINT, NETWORKNAME, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)


const deploy = makeCsprTransferDeploy({
  chainName: NETWORKNAME,
  senderPublicKeyHex: privateKey.publicKey.toHex(),
  recipientPublicKeyHex: '01a32fc327523e25c3bbf52493ea48fc9b96e241ea315f2faae2451c743622941b',
  transferAmount: '2500000000' // 2.5 CSPR
});

deploy.sign(privateKey);

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const result = await rpcClient.putDeploy(deploy);

console.log(`Deploy Hash: ${JSON.stringify(result.deployHash)}`);