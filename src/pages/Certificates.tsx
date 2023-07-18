import { Stack } from "react-bootstrap";
import { useCertificationContext } from "../context/CertificationContext";
import { Certificate } from "../components/Certificate.js";

export function Certificates() {

    const { claims, user } = useCertificationContext();

    const userCertificates = claims.filter(claim => (((claim.verifierAddress === user) || (claim.applierAddress === user)) && (claim.isApproved)))

    return (
        <div>
            <h3>
                Applications submitted :
            </h3>
            {(userCertificates.length > 0) ? (
                <Stack gap={2}>
                    {userCertificates.map(cert => (
                        <Certificate key={cert.id} {...cert} />
                    ))}
                </Stack>
            ) : (
                <div className="d-flex flex-column align-items-center my-5 gap-4">
                    <h4 className="text-muted">You have not generated a certificate yet!!</h4>
                    <div className="d-flex justify-content-center">
                        <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                        <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                        <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                    </div>
                </div>
            )}
        </div>
    )
}