const casperClientSDK = require('casper-js-sdk')
const { CasperServiceByJsonRPC } = casperClientSDK
const constants = require("../constants")

const DEPLOY_HASH =
    "ab8eceaec9d78cf43578350d48888eb44759f0dccdbc2c54772defd22823eac2";

const TRANSACTION_HASH = "6a336163b0d7a9f1b520f3bde52314de99e1a92273fa675dbb6b0d7ce68891bc"
const main = async () => {
    // const casperService = new CasperServiceByJsonRPC("http://3.14.48.188:7777/rpc"); //devnet
    const casperService = new CasperServiceByJsonRPC(constants.ENDPOINT); // mynetwork

    // working for 1.5
    let result_transaction = await casperService.getTransactionInfo({
        Deploy:
            DEPLOY_HASH
    })
    console.log(JSON.stringify(result_transaction));

    console.log("====")

    // working for condor
    let result_transaction_1 = await casperService.getTransactionInfo({
        Version1:
            TRANSACTION_HASH
    })
    console.log(JSON.stringify(result_transaction_1));



};

main();
