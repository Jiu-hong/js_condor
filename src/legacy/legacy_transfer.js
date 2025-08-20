//ok
import pkg from 'casper-js-sdk';
const {
  Deploy,
  DeployHeader,
  ExecutableDeployItem,
  HttpHandler,
  PublicKey,
  RpcClient,
  TransferDeployItem
} = pkg;

import { ENDPOINT, NETWORKNAME, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey_ed25519 } from "../utils.js"

const senderKey = getPrivateKey_ed25519(PRIVATE_KEY_PATH)

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const recipientKey = PublicKey.fromHex(
  '010068920746ecf5870e18911EE1fC5db975E0e97fFFcBBF52f5045Ad6C9838D2F'
);
const paymentAmount = '100000000';
const transferAmount = '2500000000';
const transferId = 35;

const session = new ExecutableDeployItem();

session.transfer = TransferDeployItem.newTransfer(
  transferAmount,
  recipientKey,
  undefined,
  transferId
);

const payment = ExecutableDeployItem.standardPayment(paymentAmount);

const deployHeader = DeployHeader.default();
deployHeader.account = senderKey.publicKey;
deployHeader.chainName = NETWORKNAME;

const deploy = Deploy.makeDeploy(deployHeader, payment, session);
deploy.sign(senderKey);

// console.log(JSON.stringify(deploy))

const result = await rpcClient.putDeploy(deploy);

console.log(`Deploy Hash: ${JSON.stringify(result.deployHash)}`);