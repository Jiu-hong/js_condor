const casperClientSDK = require('casper-js-sdk')
const { CasperClient } = casperClientSDK
const constants = require("../constants")

// working on 1.5
const DEPLOY_HASH =
    "f24aca24d9cda885212ece7cbe79c48cd48bfe573a5037a7f09186234491f0f1";

const main = async () => {
    // const client = new CasperClient("http://3.14.48.188:7777/rpc"); //devnet
    const client = new CasperClient(constants.ENDPOINT); // mynetwork

    let deploy_result = await client.getDeploy(DEPLOY_HASH);

    console.log(JSON.stringify(deploy_result[1]));

};

main();
