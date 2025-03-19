// OK
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    SessionBuilder,
    Args,
    CLValue,
    PublicKey, CLTypeByteArray, CLTypeUInt8
} = pkg;


import { ENDPOINT, NETWORKNAME, DEFAULT_DEPLOY_TTL, PRIVATE_KEY_PATH } from "../constants.js"
import { CONTRACT_HEX_CODE } from "../hexcode.js"
import { getPrivateKey } from "../utils.js"
const privateKey = Keys.Ed25519.parsePrivateKey(Keys.Ed25519.readBase64WithPEM(process.env.PRIVATE_KEY || ""));
const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
const signAccount = Keys.Ed25519.parseKeyPair(publicKey, privateKey);

const client = new CasperClient("");

// Sign deploy
const signed_deploy = client.signDeploy(deploy, signAccount);


// Put deploy
return await client.putDeploy(signed_deploy);