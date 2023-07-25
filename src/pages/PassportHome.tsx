import { PassportClaim } from "../components/PassportClaim";
import { PassportVerify } from "../components/PassportVerify";
import { useCertificationContext } from "../context/CertificationContext"

export function PassportHome() {
    const { user } = useCertificationContext();

    const isRecycler = (user === "0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781");
    const isAuditor = (user === "0x8f4D3e323D63abaf0A9489D83b2c7B3a74220870");

    return (
        <div>
            <h3>Passport applications yet to be verified :</h3>
            {isRecycler && (
                <PassportClaim />
            )}
            {isAuditor && (
                <PassportVerify />
            )}
        </div>
    )
}