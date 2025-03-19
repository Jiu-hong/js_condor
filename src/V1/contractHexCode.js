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

const privateKey = getPrivateKey(PRIVATE_KEY_PATH)

const rpcHandler = new HttpHandler(ENDPOINT);
const rpcClient = new RpcClient(rpcHandler);

const byteArray = [
    CLValue.newCLByteArray(PublicKey.fromHex(
        '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
    )
        .accountHash().toBytes()),
    CLValue.newCLByteArray(PublicKey.fromHex(
        '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
    )
        .accountHash().toBytes()),
    CLValue.newCLByteArray(PublicKey.fromHex(
        '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
    )
        .accountHash().toBytes()),
]

const args = Args.fromMap({
    action: CLValue.newCLString("set_all"),
    deployment_thereshold: CLValue.newCLUint8(2),
    key_management_threshold: CLValue.newCLUint8(3),
    accounts: CLValue.newCLList(
        new CLTypeByteArray(32),
        byteArray
    ),

    weights: CLValue.newCLList(CLTypeUInt8, [
        CLValue.newCLUint8(1),

    ]),
    deploy_type: CLValue.newCLString("WalletInitialization"),
    owner_0: CLValue.newCLString("01d23f9a9f240b4bb6f2aaa4253c7c8f34b2be848f104a83d3d6b9b2f276be28fa"), //test0
    owner_1: CLValue.newCLString("0203c34ddd4dcddfd5c0082cadf24613597712eb92230b901089f469170b44a569a8"),
    owner_2: CLValue.newCLString("0203c34ddd4dcddfd5c0082cadf24613597712eb92230b901089f469170b44a569a8"),
});

const sessionWasm = new SessionBuilder()
    .from(privateKey.publicKey)
    .chainName(NETWORKNAME)
    .payment(5_100_000_000)
    .ttl(DEFAULT_DEPLOY_TTL)
    .wasm(Uint8Array.from(Buffer.from(CONTRACT_HEX_CODE, 'hex')))
    .runtimeArgs(args);
const transaction = sessionWasm.build()
transaction.sign(privateKey);
try {
    const result = await rpcClient.putTransaction(transaction);
    console.log(`Transaction Hash: ${result.transactionHash}`);
} catch (e) {
    console.error(e);
}
