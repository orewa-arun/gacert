import { Card, Container, Row, Col, Stack, Button } from "react-bootstrap"
import { useCertificationContext } from "../context/CertificationContext"
import { useState } from "react";
import profiles from "../data/profiles.json";
import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import { hashGenerator } from "../utilites/hashGenerator";

type CertificateProps = {
    id: number,
    applierAddress: string,
    verifierAddress: string,
    isSender: boolean,
    plasticType: string,
    plasticQuantity: number,
    isApproved: boolean
}

export function Certificate({
    id,
    applierAddress,
    verifierAddress,
    isSender,
    plasticType,
    plasticQuantity,
    isApproved
}: CertificateProps) {

    const { getSignature } = useCertificationContext();
    const signature = getSignature(id)!;

    const [showApplier, setShowApplier] = useState(false);
    const [showApprover, setShowApprover] = useState(false);

    const applier = profiles.find(p => p.publicKey === applierAddress)!;
    const approver = profiles.find(p => p.publicKey === verifierAddress)!;

    const applierShow = () => {
        setShowApplier(!showApplier)
    }

    const approverShow = () => {
        setShowApprover(!showApprover);
    }

    const hash = hashGenerator({ id, applierAddress, verifierAddress, isSender, plasticType, plasticQuantity, isApproved });

    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '75rem' }}>
                <Stack gap={2}>
                    <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                        <Button variant="info" onClick={applierShow}>{showApplier ? <span>Close</span> : <span>Applier's details</span>}</Button>
                        <Button variant="info" onClick={approverShow}>{showApprover ? <span>Close</span> : <span>Approver's details</span>}</Button>
                    </Card.Title>
                </Stack>

                <Card.Body>
                    <Container>
                        <div className="d-flex justify-content-around">
                            {showApplier && <Profile publicKey={applierAddress} />}
                            {showApprover && <Profile publicKey={verifierAddress} />}
                        </div>

                        <Row>
                            <Col className="fw-bold fs-5" xs={4}>Applied by :</Col>
                            <Col className="fs-5" xs={6}>{applier.Name}</Col>
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col className="fw-bold fs-5" xs={4}>Approved by :</Col>
                            <Col className="fs-5" xs={6}>{approver.Name}</Col>
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col className="fw-bold fs-5" xs={4}>Plastic of type :</Col>
                            <Col className="fs-5" xs={6}>{plasticType}</Col>
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col className="fw-bold fs-5" xs={4}>with a Quantity (in kg) of :</Col>
                            <Col className="fs-5" xs={6}>{plasticQuantity}</Col>
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col className="fw-bold fs-5" xs={4}>{isSender ? <div>is sent by</div> : <div>is sent by</div>}</Col>
                            <Col className="fs-5" xs={6}>{isSender ? <div>{applier.Name} to {approver.Name}</div> : <div>{approver.Name} to {applier.Name}</div>}</Col>
                        </Row>
                        <Stack gap={2} className="mt-5">
                            <Row>
                                <Col className="fw-bold fs-5 text-muted" xs={6}>
                                    <div className="text-start">
                                        Applier's signature
                                    </div>
                                </Col>
                                <Col className="fw-bold fs-5 text-muted" xs={6}>
                                    <div className="text-end">
                                        Approver's signature
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="fw-bold fs-5" xs={6}>
                                    <div className="text-start">
                                        <Link to={signature.applierSignature}>{applier.Name}</Link>
                                    </div>
                                </Col>
                                <Col className="fw-bold fs-5" xs={6}>
                                    <div className="text-end">
                                        <Link to={signature.approverSignature}>{approver.Name}</Link>
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                {hash}
                            </div>
                        </Stack>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

