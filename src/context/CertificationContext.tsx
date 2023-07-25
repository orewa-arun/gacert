import { ReactNode, createContext, useContext, useState } from "react";
import { UserDashboard } from "../components/UserDashboard";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Claim = {
    id: number,
    applierAddress: string,
    verifierAddress: string,
    isSender: boolean,
    plasticType: string,
    plasticQuantity: number,
    isApproved: boolean
}

type BlockchainSignature = {
    id: number,
    applierSignature: string,
    approverSignature: string
}

type CertificationContext = {
    user: string,
    changeUser(): void,
    openDashboard(): void,
    closeDashboard(): void,
    claims: Claim[],
    addClaim(applier: string, approver: string, isSender: boolean, type: string, qty: number, isApproved: boolean): number,
    approveClaim(id: number): void,
    getSignature(id: number): BlockchainSignature | null,
    addApplierSignature(id: number, sign: string): void,
    addApproverSignature(id: number, sign: string): void,
}

const CertificationContext = createContext({} as CertificationContext);

export function useCertificationContext() {
    return useContext(CertificationContext);
}

type CertificationProviderProps = {
    children: ReactNode
}

export function CertificationProvider({ children }: CertificationProviderProps) {
    // These are like global variables!
    const [total, setTotal] = useLocalStorage("total", 0);
    const [claims, setClaims] = useLocalStorage<Claim[]>("claims", []);
    const [isOpenDashboard, setIsOpenDashboard] = useState(false);
    const [user, setUser] = useLocalStorage("user", "0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781");

    const [signatures, setSignatures] = useLocalStorage<BlockchainSignature[]>("signatures", []);

    const openDashboard = () => setIsOpenDashboard(true);
    const closeDashboard = () => setIsOpenDashboard(false);

    const changeUser = () => {
        if (user === "0xF32ceD175171E3D5D80072Db124139FD929af2AE") {
            setUser("0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781");
        } else if (user === "0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781") {
            setUser("0x8f4D3e323D63abaf0A9489D83b2c7B3a74220870");
        } else {
            setUser("0xF32ceD175171E3D5D80072Db124139FD929af2AE");
        }
    }

    // console.log(claims);

    function addClaim(applier: string, approver: string, isSender: boolean, type: string, qty: number, isApproved: boolean): number {
        const claim: Claim = {
            id: total,
            applierAddress: applier,
            verifierAddress: approver,
            isSender: isSender,
            plasticType: type,
            plasticQuantity: qty,
            isApproved: false
        }
        // console.log(`total before : ${total}`)
        setTotal(total + 1);
        setClaims([...claims, claim]);
        // setState will not be reflected immediately
        // console.log(`total after : ${total}`)
        return total;
    }

    function approveClaim(id: number) {
        const claim = claims.find(claim => claim.id === id);
        if (!claim) return null;

        claim.isApproved = true;

        const otherClaims = claims.filter(claim => claim.id !== id);
        setClaims([...otherClaims, claim]);
    }

    function getSignature(id: number) {
        const signature = signatures.find(sign => sign.id === id);
        if (!signature) return null;
        return signature
    }

    function addApplierSignature(id: number, sign: string) {
        const signature: BlockchainSignature = {
            id: id,
            applierSignature: sign,
            approverSignature: ''
        }
        setSignatures([...signatures, signature]);
    }

    function addApproverSignature(id: number, sign: string) {
        let signWithId = signatures.find(sign => sign.id === id);
        if (!signWithId) return null;

        signWithId.approverSignature = sign;

        const otherSignatures = signatures.filter(s => s.id !== id)

        setSignatures([...otherSignatures, signWithId]);
    }

    return (
        <CertificationContext.Provider value={{
            user,
            changeUser,
            openDashboard,
            closeDashboard,
            claims,
            addClaim,
            approveClaim,
            getSignature,
            addApplierSignature,
            addApproverSignature,
        }}>
            {children}
            <UserDashboard {...{ isOpenDashboard }} />
        </CertificationContext.Provider>
    )
}