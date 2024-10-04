const casperClientSDK = require('casper-js-sdk')
const { CasperServiceByJsonRPC, TransactionRuntime, CLAccountHash, decodeBase16, TransactionTarget, TransactionEntryPoint, TransactionCategoryLarge, TransactionScheduling, CLKey, CLU256, RuntimeArgs, TransactionUtil, InitiatorAddr, CLValueBuilder, CasperClient } = casperClientSDK
const constants = require("../constants")

const PATH_TO_CONTRACT = "/home/ubuntu/caspereco/cep18/v2/cep18.wasm"
// working on condor
const main = async () => {
    const client = new CasperServiceByJsonRPC(constants.ENDPOINT);
    const edKeyPair = constants.getKeyPairOfContract(constants.KEYPATH);
    const owner = new CLKey(new CLAccountHash(decodeBase16("daa579cf0871337cb4f670afb2cecbe52a28cdaa3346f0ab300609168e7e4ea4")));
    const amount = new CLU256(100)

    const transferArgs = RuntimeArgs.fromMap({
        owner,
        amount
    });

    const runEndpointParams = new TransactionUtil.Version1Params(
        InitiatorAddr.InitiatorAddr.fromPublicKey(edKeyPair.publicKey),
        Date.now(),
        constants.DEFAULT_DEPLOY_TTL,
        constants.NETWORK_NAME,
        TransactionUtil.PricingMode.buildFixed(3)
    );

    const runEndpointTransaction = TransactionUtil.makeV1Transaction(
        runEndpointParams,
        transferArgs,
        TransactionTarget.Session.build(constants.getBinary(PATH_TO_CONTRACT), TransactionRuntime.VmCasperV1),
        new TransactionEntryPoint.Call(),
        new TransactionScheduling.Standard(),
        TransactionUtil.TransactionCategoryInstallUpgrade
    );

    const signedRunEndpointTransaction = runEndpointTransaction.sign([
        edKeyPair
    ]);
    const { transaction_hash } = await client.transaction(
        signedRunEndpointTransaction
    );
    console.log("transaction_hash:", transaction_hash)
};
main();