const casperClientSDK = require('casper-js-sdk')
const { DeployUtil,
    CasperClient,
    RuntimeArgs,
    CLAccountHash, CLKey, decodeBase16,
    CLU256 } = casperClientSDK
const constants = require("../constants")

const main = async () => {
    // const client = new CasperClient("http://3.14.48.188:7777/rpc"); //devnet
    const client = new CasperClient(constants.ENDPOINT); // mynetwork
    const edKeyPair = constants.getKeyPairOfContract(constants.KEYPATH);

    const contract_hash = "cddc96120997bf805ec56a9f8aa4c031f58ea621c175b5fd9597ad6d6738f668"
    const owner = new CLKey(new CLAccountHash(decodeBase16("daa579cf0871337cb4f670afb2cecbe52a28cdaa3346f0ab300609168e7e4ea4")));
    const amount = new CLU256(100)
    let deploy = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
            edKeyPair.publicKey,
            constants.NETWORK_NAME,
            constants.gasPrice,
            constants.ttl
        ),
        DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            decodeBase16(contract_hash),
            "mint",
            RuntimeArgs.fromMap({ owner, amount })
        ),
        DeployUtil.standardPayment(300000000000)
    );

    deploy = client.signDeploy(deploy, edKeyPair);

    let deployHash = await client.putDeploy(deploy);

    console.log(`deploy hash = ${deployHash}`);
};

main();