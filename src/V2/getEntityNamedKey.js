const casperClientSDK = require('casper-js-sdk')
const { CasperServiceByJsonRPC } = casperClientSDK

const main = async () => {
    const client = new CasperServiceByJsonRPC("http://3.14.48.188:7777/rpc");

    const entity_identifier = {
        EntityAddr: 'entity-contract-5d5e5d85f87368c5c2a8eae8bf33505384df4ac50f7fbcaf17c939176728941d'
    }
    result = await client.getEntity(entity_identifier);
    console.log(JSON.stringify(result, null, 2))
};

main();
