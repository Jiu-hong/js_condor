const casperClientSDK = require('casper-js-sdk')
const { Keys, CasperServiceByJsonRPC, CLPublicKey, DeployUtil, CLValue, CLValueBuilder, CasperClient } = casperClientSDK

const main = async () => {
  // const client = new CasperClient("http://3.14.48.188:7777/rpc");  //devnet
  const client = new CasperClient("http://35.87.247.87:7777/rpc"); // mynetwork
  // const client = new CasperServiceByJsonRPC(
  //     "http://3.14.48.188:7777/rpc"
  //   );

  const getKeyPairOfContract = (pathToFaucet) => {
    return Keys.Ed25519.loadKeyPairFromPrivateFile(
      `${pathToFaucet}/secret_key.pem`
    );
  };

  // 1. key pair
  const edKeyPair = getKeyPairOfContract("/home/ubuntu/keys/test0");

  // 4. build a transfer transaction // 018CA295397175F208873612EcDf1ad23B177159bAa26B687bE555cBF34Ab906F8
  const recipientPublicKey = CLPublicKey.fromHex('0195a4293a9cfbce005a590e0910c95ff7244df0d8428460cc6ad47dbf34eee6ec') // to
  // const NETWORK_NAME = 'casper-test'
  // const NETWORK_NAME = 'casper'
  // const NETWORK_NAME = 'dev-net'
  const NETWORK_NAME = 'casper-jiuhong-test-jh-1'
  const paymentAmount = 1e9;
  const transferAmount = (2.5 * 1000000000); // min 2.5 * 1000000000
  const gasPrice = 1
  const id = 12345;
  const ttl = 3600000; // 1 hour
  const deployParams = new DeployUtil.DeployParams(
    edKeyPair.publicKey,
    NETWORK_NAME,
    gasPrice,
    ttl
  );
  const session = DeployUtil.ExecutableDeployItem.newTransferWithOptionalTransferId(
    transferAmount, // what is the meaning of transferAmount?
    recipientPublicKey,
    undefined,
    id
  );
  const payment = DeployUtil.standardPayment(paymentAmount);
  let deploy = DeployUtil.makeDeploy(deployParams, session, payment);
  // add addition receiverPubicKey arg for query/updator/validator
  const accountHash = accountHashFromPublicKeyHex('0195a4293a9cfbce005a590e0910c95ff7244df0d8428460cc6ad47dbf34eee6ec')
  deploy = DeployUtil.addArgToDeploy(
    deploy,
    'targetAccountHex',
    // CLPublicKey.fromHex('01553cacae20245361ca0bfe78b71dd6e71d67618b7c35d900aa9bc99257f3c621') // to
    CLValueBuilder.string(accountHash)
  );
  function accountHashFromPublicKeyHex(hexPublicKey) {
    const publicKey = CLPublicKey.fromHex(hexPublicKey)
    return Buffer.from(publicKey.toAccountHash().value()).toString('hex')
  }
  const signedDeploy = DeployUtil.signDeploy(deploy, edKeyPair);

  let deployHash = await client.putDeploy(deploy);
  console.log("deployHash", deployHash);
  const signedDeployJSON = DeployUtil.deployToJson(signedDeploy) // is this deploy tx ready to broadcast?
  console.log('signed deploy json string:')
  console.dir(signedDeployJSON, { depth: 10 })
  console.log(JSON.stringify(signedDeployJSON))
  const deployD = DeployUtil.deployFromJson(signedDeployJSON)
  console.log(deployD.unwrap().isTransfer())

  // casper-test
  // console.log(`curl --location --request POST 'http://3.136.227.9:7777/rpc' \
  // --header 'Content-Type: application/json' \
  // --data-raw '{
  //     "id": 0,
  //     "jsonrpc": "2.0",
  //     "method": "account_put_deploy",
  //     "params": ${JSON.stringify(signedDeployJSON)}
  // }'
  // `)

  // // casper
  // console.log(`curl --location --request POST 'http://qukuai-cspr-1a-1.aws-jp1.huobiidc.com:8080/rpc' \
  // --header 'Content-Type: application/json' \
  // --data-raw '{
  //     "id": 0,
  //     "jsonrpc": "2.0",
  //     "method": "account_put_deploy",
  //     "params": ${JSON.stringify(signedDeployJSON)}
  // }'
  // `)

  // casper-condor(dev-net)
  console.log(`curl --location --request POST '3.14.48.188:7777/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "account_put_deploy",
    "params": ${JSON.stringify(signedDeployJSON)}
}'
`)

  // casper-condor(dev-net)
  // curl --location 'http://3.14.48.188:7777/rpc' --header 'Content-Type: application/json' --data ' {"id": 1, "jsonrpc": "2.0", "method": "chain_get_state_root_hash", "params": []}'

  // curl --location --request POST '3.14.48.188:7777/rpc' --header 'Content-Type: application/json' --data-raw '{"id": 1,"jsonrpc": "2.0","method": "account_put_deploy","params": {"deploy": "xxx"}}')
}

main()