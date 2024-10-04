const casperClientSDK = require('casper-js-sdk')
const fs = require("fs")
const { Keys } = casperClientSDK


// const NETWORK_NAME = 'casper-jiuhong-test-jh'
// const ENDPOINT = "http://34.223.109.37:7777/rpc"
const NETWORK_NAME = 'dev-net'
const ENDPOINT = "http://3.14.48.188:7777/rpc"
const KEYPATH = "/home/ubuntu/keys/test0"
const gasPrice = 1
const ttl = 3600000; // 1 hour
const PATH_TO_CONTRACT = "/home/ubuntu/caspereco/cep18/v1/cep18.wasm"
const DEFAULT_DEPLOY_TTL = 1800000;


const getKeyPairOfContract = (pathToFaucet) => {
    return Keys.Ed25519.loadKeyPairFromPrivateFile(
        `${pathToFaucet}/secret_key.pem`
    );
};

const getBinary = (pathToBinary) => {
    return new Uint8Array(fs.readFileSync(pathToBinary, null).buffer);
};
module.exports = { NETWORK_NAME, gasPrice, ttl, PATH_TO_CONTRACT, getKeyPairOfContract, DEFAULT_DEPLOY_TTL, ENDPOINT, KEYPATH, getBinary }
