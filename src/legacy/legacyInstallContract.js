const casperClientSDK = require('casper-js-sdk')
const { RuntimeArgs, DeployUtil, CLValueBuilder, CasperClient } = casperClientSDK
const constants = require("../constants")

const PATH_TO_CONTRACT = "/home/ubuntu/caspereco/cep18/v1/cep18.wasm"
// working on 1.5
const main = async () => {

    // const client = new CasperClient("http://3.14.48.188:7777/rpc");  //devnet
    const client = new CasperClient(constants.ENDPOINT); // mynetwork

    const edKeyPair = constants.getKeyPairOfContract(constants.KEYPATH);

    const deployParams = new DeployUtil.DeployParams(
        edKeyPair.publicKey,
        constants.NETWORK_NAME,
        constants.gasPrice,
        constants.ttl
    );
    const session = DeployUtil.ExecutableDeployItem.newModuleBytes(
        constants.getBinary(PATH_TO_CONTRACT),
        RuntimeArgs.fromMap({
            name: CLValueBuilder.string("TEST7_CEP18"),
            symbol: CLValueBuilder.string("TFT"),
            decimals: CLValueBuilder.u8(9),
            total_supply: CLValueBuilder.u256(200000000000),
            events_mode: CLValueBuilder.u8(1),
            enable_mint_burn: CLValueBuilder.u8(1),
        }));
    const payment = DeployUtil.standardPayment(300000000000);
    let deploy = DeployUtil.makeDeploy(deployParams, session, payment);

    deploy = client.signDeploy(deploy, edKeyPair);

    let deployHash = await client.putDeploy(deploy);

    console.log(`deploy hash = ${deployHash}`);
};

main();