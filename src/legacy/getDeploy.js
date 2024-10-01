const casperClientSDK = require('casper-js-sdk')
const { CasperClient } = casperClientSDK
const constants = require("../constants")

// working on 1.5
const DEPLOY_HASH =
    "acc07cbaa0d0574564cb147035e7699d9ad531c458bf07f37e7d38a6bc098a9d";

const main = async () => {
    // const client = new CasperClient("http://3.14.48.188:7777/rpc"); //devnet
    const client = new CasperClient(constants.ENDPOINT); // mynetwork

    let deploy_result = await client.getDeploy(DEPLOY_HASH);

    console.log(JSON.stringify(deploy_result[1]));

};

main();
