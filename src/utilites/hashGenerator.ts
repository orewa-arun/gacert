import {sha256,toUtf8Bytes } from 'ethers';

type Claim = {
    id: number,
    applierAddress: string,
    verifierAddress: string,
    isSender: boolean,
    plasticType: string,
    plasticQuantity: number,
    isApproved: boolean
}

export function hashGenerator(claim : Claim){
    const claimAsString = JSON.stringify(claim);
    const claimBytes = toUtf8Bytes(claimAsString);

    const txHash = sha256(claimBytes);
    console.log(txHash);

    return txHash;
}