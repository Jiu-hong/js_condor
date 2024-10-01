const casperClientSDK = require('casper-js-sdk')
const { CasperClient } = casperClientSDK

// working on 1.5
const DEPLOY_HASH =
    "ab8eceaec9d78cf43578350d48888eb44759f0dccdbc2c54772defd22823eac2";

const main = async () => {
    // const client = new CasperClient("http://3.14.48.188:7777/rpc"); //devnet
    const client = new CasperClient(constants.ENDPOINT); // mynetwork

    let deploy_result = await client.getDeploy(DEPLOY_HASH);

    console.log(JSON.stringify(deploy_result[1]));

};

main();
