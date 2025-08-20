import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    Hash, CasperNetwork, TransactionHash,
} = pkg;


import { ENDPOINT } from "../constants.js"

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);


const DEPLOY_HASH_MAINNET = Hash.fromHex("567b04f471307b244cc898ea8218bda58e2c350caf2038c92a56ab444474c82d")
const myfunc = async () => {
    const network = await CasperNetwork.create(rpcClient)

    const deply_hash = new TransactionHash(DEPLOY_HASH_MAINNET, null)
    const result = await network.getTransaction(deply_hash)
    console.log("result:", JSON.stringify(result))
}

myfunc()


