// ok
import pkg from 'casper-js-sdk';
const {
  HttpHandler,
  RpcClient,
  makeAuctionManagerDeploy,
  AuctionManagerEntryPoint
} = pkg;

import { ENDPOINT, NETWORKNAME, PRIVATE_KEY_PATH } from "../constants.js"
// get private key fromHex, fromPem or generate it
// test97
import { getPrivateKey } from "../utils.js"

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)


const deploy = makeAuctionManagerDeploy({
  chainName: NETWORKNAME,
  contractEntryPoint: AuctionManagerEntryPoint.delegate,
  delegatorPublicKeyHex: privateKey.publicKey.toHex(),
  validatorPublicKeyHex: '0115c9b40c06ff99b0cbadf1140b061b5dbf92103e66a6330fbcc7768f5219c1ce',
  amount: '5000000000' // 500 CSPR
});

deploy.sign(privateKey);

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const result = await rpcClient.putDeploy(deploy);

console.log(`Deploy Hash: ${JSON.stringify(result.deployHash)}`);