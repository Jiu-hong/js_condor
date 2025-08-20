// ok
import pkg from 'casper-js-sdk';
const { HttpHandler,
  RpcClient,
} = pkg
import { ENDPOINT } from "../constants.js"

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

// testnet
// const DEPLOY_HASH = "70483179681587e84b0b44a95ad764b6a14249edb8f30b1636f946e26c2d0c8c"
// mainnet
const DEPLOY_HASH = "181baadd6ee45675bd90ca778f62e405216bdce80931b788e381c5d77f9ff185"
// const result = await rpcClient.getTransactionByDeployHash(
//   DEPLOY_HASH
// );
const getDeployResult = await rpcClient.getDeploy(
  DEPLOY_HASH
);

// const deploy = getDeployResult.deploy


// // work for mainnet
// // const info = getDeployResult.executionResultsV1

// // work for testnet
// const info = getDeployResult.executionInfo

const info = getDeployResult.toInfoGetTransactionResult()
console.log(JSON.stringify(info))




// console.log(JSON.stringify(deploy))
console.log(JSON.stringify(info))




