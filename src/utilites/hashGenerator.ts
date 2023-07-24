import {sha256,toUtf8Bytes } from 'ethers';
import {Claim} from "../context/CertificationContext.jsx";


export function hashGenerator(claim : Claim){
    const claimAsString = JSON.stringify(claim);
    const claimBytes = toUtf8Bytes(claimAsString);

    const txHash = sha256(claimBytes);
    console.log(txHash);

    return txHash;
}