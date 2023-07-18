import { Wallet, ethers } from "ethers";
import profiles from "../data/profiles.json";
import { abi } from "../data/gacert_contract.json";

export async function applyTransaction(applier: string, id: number, approver: string) {

    const profile = profiles.find(p => p.publicKey === applier);
    if (!profile) return null;

    const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/3aKSXpftk7mqauru7JbbLikIYJe9St5W");

    const wallet = new Wallet(profile.privateKey, provider);

    const gacert = new ethers.Contract("0x211C36F302113b59CA67E7C48c57aaC510Fddb90", abi, wallet);

    const tx = await gacert.applyCert(id, approver);

    const polygonScanURL = `https://mumbai.polygonscan.com/tx/${tx.hash}`;

    return polygonScanURL;
}