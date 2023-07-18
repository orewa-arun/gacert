import { ReactNode, createContext, useContext, useState } from "react";
import { UserDashboard } from "../components/UserDashboard";

type Claim = {
    id: number,
    applierAddress: string,
    verifierAddress: string,
    isSender: boolean,
    plasticType: string,
    plasticQuantity: number
}

type CertificationContext = {
    user: string,
    changeUser(): void,
    openDashboard(): void,
    closeDashboard(): void,
    claims: Claim[],
    addClaim(applier: string, approver: string, isSender: boolean, type: string, qty: number): number
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
    const [total, setTotal] = useState(0);
    const [claims, setClaims] = useState<Claim[]>([]);
    const [isOpenDashboard, setIsOpenDashboard] = useState(false);
    const [user, setUser] = useState("0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781");

    const openDashboard = () => setIsOpenDashboard(true);
    const closeDashboard = () => setIsOpenDashboard(false);

    const changeUser = () => {
        if (user === "0xF32ceD175171E3D5D80072Db124139FD929af2AE") {
            setUser("0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781");
        } else {
            setUser("0xF32ceD175171E3D5D80072Db124139FD929af2AE");
        }
    }

    // console.log(claims);

    function addClaim(applier: string, approver: string, isSender: boolean, type: string, qty: number): number {
        const claim: Claim = {
            id: total,
            applierAddress: applier,
            verifierAddress: approver,
            isSender: isSender,
            plasticType: type,
            plasticQuantity: qty
        }
        setTotal(total + 1);
        setClaims([...claims, claim]);

        return (total - 1);
    }

    return (
        <CertificationContext.Provider value={{
            user,
            changeUser,
            openDashboard,
            closeDashboard,
            claims,
            addClaim
        }}>
            {children}
            <UserDashboard {...{ isOpenDashboard }} />
        </CertificationContext.Provider>
    )
}