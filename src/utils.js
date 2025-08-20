import fs from "fs"

import pkg from "casper-js-sdk";
const { PrivateKey, KeyAlgorithm } = pkg;

const getBinary = (pathToBinary) => {
    return new Uint8Array(fs.readFileSync(pathToBinary, null).buffer);
};

const getPrivatePemString = (pathToSecretPem) => fs.readFileSync(pathToSecretPem).toString()

const getPrivateKey_ed25519 = (pathToSecretPem) => PrivateKey.fromPem(
    getPrivatePemString(pathToSecretPem),
    KeyAlgorithm.ED25519 // or KeyAlgorithm.ED25519, depends on your private key
);

const getPrivateKey_secp256k1 = (pathToSecretPem) => PrivateKey.fromPem(
    getPrivatePemString(pathToSecretPem),
    KeyAlgorithm.SECP256K1 // or KeyAlgorithm.ED25519, depends on your private key
);
export { getBinary, getPrivateKey_ed25519, getPrivateKey_secp256k1 }
