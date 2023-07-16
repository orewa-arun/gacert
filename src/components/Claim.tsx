import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useCertificationContext } from "../context/CertificationContext"
import { Profile } from "./Profile";
import { useState } from "react";

type ClaimProps = {
    id: number,
    applierAddress: string,
    verifierAddress: string,
    isSender: boolean,
    plasticType: string,
    plasticQuantity: number
}

export function Claim({
    id,
    applierAddress,
    verifierAddress,
    isSender,
    plasticType,
    plasticQuantity
}: ClaimProps) {

    const { user } = useCertificationContext();

    const [showApprover, setShowApprover] = useState(false);

    const show = () => {
        setShowApprover(!showApprover)
    }

    return (
        <div>
            {(user === applierAddress) && (
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '75rem' }}>
                        <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                            <span className="fs-7 text-muted">Verifier's unique Id : {verifierAddress}</span>
                            <Button variant="info" onClick={show}>{showApprover ? <span>Close</span> : <span>Verifier's details</span>}</Button>
                        </Card.Title>
                        <Card.Body>
                            <Container>
                                {/* Columns are always 50% wide, on mobile and desktop */}
                                <div className="d-flex justify-content-center">
                                    {showApprover && <Profile publicKey={verifierAddress} />}
                                </div>

                                <Row className="d-flex align-items-center">
                                    <Col className="fw-bold fs-5" xs={4}>Send/Receive :</Col>
                                    <Col className="fs-5" xs={6}>{isSender ? <div>Sent</div> : <div>Receive</div>}</Col>
                                </Row>
                                <Row className="d-flex align-items-center">
                                    <Col className="fw-bold fs-5" xs={4}>PlasticType :</Col>
                                    <Col className="fs-5" xs={6}>{plasticType}</Col>
                                </Row>
                                <Row className="d-flex align-items-center">
                                    <Col className="fw-bold fs-5" xs={4}>Quantity (in kg) :</Col>
                                    <Col className="fs-5" xs={6}>{plasticQuantity}</Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    )
}