import {sha256,toUtf8Bytes } from 'ethers';
import {Claim} from "../context/CertificationContext.jsx";
import {Passport} from "../components/PassportClaim.js";

export function hashGenerator(claim : Claim|Passport){
    const claimAsString = JSON.stringify(claim);
    const claimBytes = toUtf8Bytes(claimAsString);

    const txHash = sha256(claimBytes);
    console.log(txHash);

    return txHash;
}