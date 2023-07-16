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
    openDashboard(): void,
    closeDashboard(): void,
    addClaim(applier: string, approver: string, isSender: boolean, type: string, qty: number): void
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

    const openDashboard = () => setIsOpenDashboard(true);
    const closeDashboard = () => setIsOpenDashboard(false);

    console.log(total, claims);

    function addClaim(applier: string, approver: string, isSender: boolean, type: string, qty: number) {
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
    }

    return (
        <CertificationContext.Provider value={{
            openDashboard,
            closeDashboard,
            addClaim
        }}>
            {children}
            <UserDashboard isOpen={isOpenDashboard} />
        </CertificationContext.Provider>
    )
}