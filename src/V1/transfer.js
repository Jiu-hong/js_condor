// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
  RpcClient,
  NativeTransferBuilder,
  PrivateKey,
  KeyAlgorithm,
  PublicKey
} = pkg;

import { ENDPOINT, NETWORKNAME, PRIVATE_KEY_PATH } from "../constants.js"
import { getPrivateKey_ed25519 } from "../utils.js"

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

// get private key fromHex, fromPem or generate it
const privateKey = getPrivateKey_ed25519(PRIVATE_KEY_PATH)

const transaction = new NativeTransferBuilder()
  .from(privateKey.publicKey)
  .target(
    PublicKey.fromHex( //test0
      '015ae051e794bde1a085ad0f05ac2735e87fa353c558a392b5d3b913f0145ab27f'
    )
  )
  .amount('2500000000') // Amount in motes
  .id(Date.now())
  .chainName(NETWORKNAME)
  .payment(100_000_000)
  .build();

transaction.sign(privateKey);

try {
  const result = await rpcClient.putTransaction(transaction);
  console.log(`Transaction Hash: ${result.transactionHash}`);
} catch (e) {
  console.error(e);
}