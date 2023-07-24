import { Wallet, ethers } from "ethers";
import profiles from "../data/profiles.json";
import { abi } from "../data/gacert_contract.json";
import { hashGenerator } from "./hashGenerator";
import {Claim} from "../context/CertificationContext.jsx";

export async function applyTransaction(applier: string, id: number, approver: string, claim : Claim) {

    const profile = profiles.find(p => p.publicKey === applier);
    if (!profile) return null;

    const dataHash = hashGenerator(claim);
    console.log(dataHash);

    const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/3aKSXpftk7mqauru7JbbLikIYJe9St5W");

    const wallet = new Wallet(profile.privateKey, provider);

    const gacert = new ethers.Contract("0xd369b5dAd709aAd10A71625c8a29d42e460AEC40", abi, wallet);

    const tx = await gacert.applyCert(id, approver, dataHash);

    const polygonScanURL = `https://mumbai.polygonscan.com/tx/${tx.hash}`;

    return polygonScanURL;
}