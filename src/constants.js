

const ENDPOINT = 'http://node.integration.casper.network:7777/rpc'
const NETWORKNAME = 'integration-test'
// const NETWORKNAME = 'casper-test-jh-20'
// const ENDPOINT = "http://34.219.169.213:7777/rpc"
// const NETWORK_NAME = 'dev-net'
// const ENDPOINT = "http://3.14.48.188:7777/rpc"
// const PRIVATE_KEY_PATH = "/home/ubuntu/keys/mynetwork/secret_key.pem"
const PRIVATE_KEY_PATH = "/home/ubuntu/keys/test0/secret_key.pem"
const gasPrice = 1
const ttl = 3600000; // 1 hour
const PATH_TO_CONTRACT = "/home/ubuntu/caspereco/cep18/v1/cep18.wasm"
const DEFAULT_DEPLOY_TTL = 1800000;


export { NETWORKNAME, gasPrice, ttl, PATH_TO_CONTRACT, DEFAULT_DEPLOY_TTL, ENDPOINT, PRIVATE_KEY_PATH }
