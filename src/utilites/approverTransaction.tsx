import { Wallet, ethers } from "ethers";
import profiles from "../data/profiles.json";
import { abi } from "../data/gacert_contract.json";

export async function approveTransaction(approver: string, id: number) {

    const profile = profiles.find(p => p.publicKey === approver);
    if (!profile) return null;

    const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/3aKSXpftk7mqauru7JbbLikIYJe9St5W");

    const wallet = new Wallet(profile.privateKey, provider);

    const gacert = new ethers.Contract("0x211C36F302113b59CA67E7C48c57aaC510Fddb90", abi, wallet);

    const tx = await gacert.approveCert(id, approver);

    return tx;
}