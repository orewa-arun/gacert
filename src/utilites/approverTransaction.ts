import { Wallet, ethers } from "ethers";
import profiles from "../data/profiles.json";
import { abi } from "../data/gacert_contract.json";
import { hashGenerator } from "./hashGenerator";
import {Claim} from "../context/CertificationContext.jsx";
import {Passport} from "../components/PassportClaim.js";

export async function approveTransaction(approver: string, id: number , claim : Claim|Passport) {

    const profile = profiles.find(p => p.publicKey === approver);
    if (!profile) return null;

    const dataHash = hashGenerator(claim);

    const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/3aKSXpftk7mqauru7JbbLikIYJe9St5W");

    const wallet = new Wallet(profile.privateKey, provider);

    const gacert = new ethers.Contract("0xd369b5dAd709aAd10A71625c8a29d42e460AEC40", abi, wallet);

    const tx = await gacert.approveCert(id,dataHash);

    const polygonScanURL = `https://mumbai.polygonscan.com/tx/${tx.hash}`;

    return polygonScanURL;
}