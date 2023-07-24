import { Stack } from "react-bootstrap";
import { useCertificationContext } from "../context/CertificationContext";
import { Claim } from "../components/Claim.jsx"
import { Approval } from "../components/Approval.js";

export function Home() {

    const { claims, user } = useCertificationContext();

    const claim = claims.find(claim => (claim.applierAddress === user && !claim.isApproved));
    const approve = claims.find(claim => (claim.verifierAddress === user && !claim.isApproved));

    return (
        <div className="d-flex flex-column justify-content-center ">
            <div>
                <h3>
                    Applications submitted :
                </h3>
                {claim ? (
                    <Stack gap={2}>
                        {claims.map(claim => (
                            <Claim key={claim.id} {...claim} />
                        ))}
                    </Stack>
                ) : (
                    <div className="d-flex flex-column align-items-center my-5 gap-4">
                        <h4 className="text-muted">No applications are pending for approval!!</h4>
                        <div className="d-flex justify-content-center">
                            <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                            <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                            <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                        </div>
                    </div>
                )}
            </div>
            <div>
                <h3>
                    Approvals pending :
                </h3>
                {approve ? (
                    <Stack gap={2}>
                        {claims.map(claim => (
                            <Approval key={claim.id} {...claim} />
                        ))}
                    </Stack>
                ) : (
                    <div className="d-flex flex-column align-items-center my-5 gap-4">
                        <h4 className="text-muted">No approvals are pending</h4>
                        <div className="d-flex justify-content-center">
                            <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                            <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                            <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}