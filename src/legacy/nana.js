// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
  RpcClient,
  SessionBuilder,
  Args,
  CLValue, TransferDeployItem,
  PublicKey, ExecutableDeployItem, Deploy, DeployHeader
} = pkg;


import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { getBinary, getPrivateKey_ed25519 } from "../utils.js"

const privateKey = getPrivateKey_ed25519(PRIVATE_KEY_PATH)

const PATH_TO_CONTRACT = "/mnt/ebs_volume/ca/js_condor/wasm/contract.wasm"


const deployHeader = new DeployHeader(
  NETWORKNAME,
  undefined,
  undefined,
  undefined,
  undefined,
  privateKey.publicKey,
  undefined
);

const executableDeployItem = new ExecutableDeployItem();
executableDeployItem.transfer = TransferDeployItem.newTransfer(
  2500000000,
  recipientKey.publicKey,
  undefined,
  id
);

const payment = ExecutableDeployItem.standardPayment(paymentAmount);
let deploy = Deploy.makeDeploy(deployHeader, payment, executableDeployItem);
deploy.sign(senderKey);
deploy.sign(recipientKey);

const json = Deploy.toJSON(deploy);

deploy = Deploy.fromJSON(json);