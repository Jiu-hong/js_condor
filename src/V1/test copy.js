
// OK
import { BigNumber } from '@ethersproject/bignumber';
import pkg from 'casper-js-sdk';
const { HttpHandler,
    RpcClient,
    SessionBuilder,
    Args,
    CLValue,
    PublicKey, NamedArg, TransactionV1Payload, Duration,
    Timestamp,
    Transaction,
    TransactionV1,
    InitiatorAddr,
    FixedMode,
    PricingMode,
    KeyAlgorithm,
    PrivateKey,

    SessionTarget,
    TransactionRuntime,
    TransactionTarget,
    TransactionEntryPoint,
    TransactionEntryPointEnum,
    TransactionScheduling,


    NativeTransferBuilder
} = pkg;

const keys = PrivateKey.generate(KeyAlgorithm.ED25519);
const paymentAmount = 20000000000000;

const pricingMode = new PricingMode();
const fixedMode = new FixedMode();
fixedMode.gasPriceTolerance = 3;
fixedMode.additionalComputationFactor = 1;
pricingMode.fixed = fixedMode;

const args = Args.fromMap({
    target: CLValue.newCLPublicKey(
        PublicKey.fromHex(
            '0202f5a92ab6da536e7b1a351406f3744224bec85d7acbab1497b65de48a1a707b64'
        )
    ),
    amount: CLValue.newCLUInt512(BigNumber.from(paymentAmount)),
    id: CLValue.newCLOption(CLValue.newCLUint64(3))
});

const sessionTarget = new SessionTarget();

sessionTarget.runtime = TransactionRuntime.vmCasperV1();
sessionTarget.moduleBytes = Uint8Array.from([1]);
sessionTarget.isInstallUpgrade = false;

const transactionTarget = new TransactionTarget(
    undefined,
    undefined,
    sessionTarget
);
const scheduling = new TransactionScheduling({});
const entryPoint = new TransactionEntryPoint(
    TransactionEntryPointEnum.Call
);
const transactionPayload = TransactionV1Payload.build({
    initiatorAddr: new InitiatorAddr(keys.publicKey),
    ttl: new Duration(1800000),
    args,
    timestamp: new Timestamp(new Date()),
    entryPoint,
    scheduling,
    transactionTarget,
    chainName: 'casper-net-1',
    pricingMode
});

toBytes(): Uint8Array {
    const bufferSize = 1024;
    let runtimeArgsBuffer = new ArrayBuffer(bufferSize);
    let runtimeArgsView = new DataView(runtimeArgsBuffer);
    let offset = 0;

    runtimeArgsView.setUint8(offset, 0x00);
    offset += 1;

    if (offset + 4 > runtimeArgsBuffer.byteLength) {
        runtimeArgsBuffer = expandBuffer(runtimeArgsBuffer, offset + 4);
        runtimeArgsView = new DataView(runtimeArgsBuffer);
    }
    runtimeArgsView.setUint32(offset, this.fields.args.args.size, true);
    offset += 4;

    for (const [name, value] of Array.from(this.fields.args.args.entries())) {
        const namedArg = new NamedArg(name, value);
        const argBytes = NamedArg.toBytesWithNamedArg(namedArg);

        if (offset + argBytes.length > runtimeArgsBuffer.byteLength) {
            runtimeArgsBuffer = expandBuffer(
                runtimeArgsBuffer,
                offset + argBytes.length
            );
            runtimeArgsView = new DataView(runtimeArgsBuffer);
        }
        new Uint8Array(runtimeArgsBuffer, offset).set(argBytes);
        offset += argBytes.length;
    }

    const runtimeArgsBytes = new Uint8Array(runtimeArgsBuffer, 0, offset);

    const fields = new PayloadFields();

    const runtimeArgsWithLength = new Uint8Array(runtimeArgsBytes.length + 4);
    new DataView(runtimeArgsWithLength.buffer).setUint32(
        0,
        runtimeArgsBytes.length,
        true
    );
    runtimeArgsWithLength.set(runtimeArgsBytes, 4);
    fields.addField(0, runtimeArgsWithLength);

    const targetBytes = this.fields.target.toBytes();
    const targetWithLength = new Uint8Array(targetBytes.length + 4);
    new DataView(targetWithLength.buffer).setUint32(
        0,
        targetBytes.length,
        true
    );
    targetWithLength.set(targetBytes, 4);
    fields.addField(1, targetWithLength);

    const entryPointBytes = this.fields.entryPoint.toBytes();
    const entryPointWithLength = new Uint8Array(entryPointBytes.length + 4);
    new DataView(entryPointWithLength.buffer).setUint32(
        0,
        entryPointBytes.length,
        true
    );
    entryPointWithLength.set(entryPointBytes, 4);
    fields.addField(2, entryPointWithLength);

    const schedulingBytes = this.fields.scheduling.toBytes();
    const schedulingWithLength = new Uint8Array(schedulingBytes.length + 4);
    new DataView(schedulingWithLength.buffer).setUint32(
        0,
        schedulingBytes.length,
        true
    );
    schedulingWithLength.set(schedulingBytes, 4);
    fields.addField(3, schedulingWithLength);

    return new CalltableSerialization()
        .addField(0, this.initiatorAddr.toBytes())
        .addField(1, CLValue.newCLUint64(this.timestamp.toMilliseconds()).bytes())
        .addField(2, CLValue.newCLUint64(this.ttl.duration).bytes())
        .addField(3, CLValue.newCLString(this.chainName).bytes())
        .addField(4, this.pricingMode.toBytes())
        .addField(5, fields.toBytes())
        .toBytes();
}
// to_bytes
// const namedArg = new NamedArg("arg1", CLValue.newCLUInt32(42));

// const serializedBytes = NamedArg.toBytesWithNamedArg(namedArg);
// console.log(Buffer.from(serializedBytes).toString('hex')); // Logs the serialized bytes.

// export const writeBytes = (
//     view,
//     offset,
//     value
// ) => {
//     for (let i = 0; i < value.length; i++) {
//         view.setUint8(offset + i, value[i]);
//     }
//     return offset + value.length;
// };
// // const buffer = new ArrayBuffer(10);
// // const view = new DataView(buffer);
// // let offset = 0;
// // offset = writeBytes(view, offset, new Uint8Array([1, 2, 3, 4]));
// // console.log(new Uint8Array(buffer)); // Logs: Uint8Array [1, 2, 3, 4, 0, 0, 0, 0, 0, 0]
// // console.log(offset)
// // 

// export const writeInteger = (
//     view,
//     offset,
//     value
// ) => {
//     view.setInt32(offset, value, true);
//     return offset + 4;
// };

// const buffer = new ArrayBuffer(20);
// // console.log(buffer)
// const view = new DataView(buffer);
// let offset = 0;
// offset = writeInteger(view, offset, 42);
// console.log("====writeInteger")
// console.log((new Int32Array(buffer)).buffer); // Logs: Int32Array [42, 0]

// export const writeUInteger = (
//     view,
//     offset,
//     value
// ) => {
//     view.setUint32(offset, value, true);
//     return offset + 4;
// };
// const buffer1 = new ArrayBuffer(20);
// // console.log(buffer1)
// const view1 = new DataView(buffer1);
// let offset1 = 0;
// offset1 = writeUInteger(view1, offset1, 42);
// console.log("====writeUInteger")
// console.log((new Int32Array(buffer1)).buffer); // Logs: Int32Array [42, 0]

