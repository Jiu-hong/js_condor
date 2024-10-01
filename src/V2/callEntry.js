const casperClientSDK = require('casper-js-sdk')
const { CasperServiceByJsonRPC, TransactionRuntime, TransactionInvocationTarget, CLAccountHash, decodeBase16, TransactionTarget, TransactionEntryPoint, TransactionCategoryLarge, TransactionScheduling, CLKey, CLU256, RuntimeArgs, TransactionUtil, InitiatorAddr, CLValueBuilder, CasperClient } = casperClientSDK
const constants = require("../constants")

// working on 1.5
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
        InitiatorAddr.matchInitiatorAddress(edKeyPair.publicKey),
        Date.now(),
        constants.DEFAULT_DEPLOY_TTL,
        constants.NETWORK_NAME,
        TransactionUtil.PricingMode.buildFixed(3)
    );
    const byHash = new TransactionInvocationTarget.TransactionInvocationTarget();
    const contractHash = "cddc96120997bf805ec56a9f8aa4c031f58ea621c175b5fd9597ad6d6738f668"

    byHash.ByHash = decodeBase16(contractHash);
    const runEndpointTransaction = TransactionUtil.makeV1Transaction(
        runEndpointParams,
        transferArgs,
        TransactionTarget.Stored.build(byHash, TransactionRuntime.VmCasperV1),
        TransactionEntryPoint.Custom.build('mint'),
        new TransactionScheduling.Standard(),
        TransactionUtil.TransactionCategoryLarge
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