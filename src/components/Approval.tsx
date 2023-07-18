import { Button, Form, Card, Col, Container, Row } from "react-bootstrap"
import { useCertificationContext } from "../context/CertificationContext"
import { Profile } from "./Profile";
import { useState } from "react";
import { approveTransaction } from "../utilites/approverTransaction";
import { useNavigate } from "react-router-dom";

type ClaimProps = {
    id: number,
    applierAddress: string,
    verifierAddress: string,
    isSender: boolean,
    plasticType: string,
    plasticQuantity: number
}

export function Approval({
    id,
    applierAddress,
    verifierAddress,
    isSender,
    plasticType,
    plasticQuantity
}: ClaimProps) {

    const navigate = useNavigate();

    const { user } = useCertificationContext();

    const [showClaimer, setShowClaimer] = useState(false);

    const [agreed, setAgreed] = useState(false);

    const handleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(e.target.checked);
    }

    const handleApproval = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userAddress = await approveTransaction(user, id);
        alert(`Certificate generated!!!`);
        console.log(userAddress);
        navigate("/certificates");
    }

    const show = () => {
        setShowClaimer(!showClaimer)
    }

    return (
        <div>
            {(user === verifierAddress) && (
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '75rem' }}>
                        <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                            <span className="fs-7 text-muted">Claimer's unique Id : {applierAddress}</span>
                            <Button variant="info" onClick={show}>{showClaimer ? <span>Close</span> : <span>Claimer's details</span>}</Button>
                        </Card.Title>
                        <Card.Body>
                            <Container>
                                {/* Columns are always 50% wide, on mobile and desktop */}
                                <div className="d-flex justify-content-center">
                                    {showClaimer && <Profile publicKey={verifierAddress} />}
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
                            <Form onSubmit={handleApproval} className="mt-4">
                                <Form.Group className="mb-3" controlId="formAgreeCheck" style={{ backgroundColor: "#fadf48" }}>
                                    <Form.Check
                                        onChange={handleAgree}
                                        type="checkbox"
                                        label="I hereby declare that the information furnished above is true, 
                                complete and correct to the best of my knowledge and belief."
                                        className="mx-2"
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit" disabled={!agreed} className="btn btn-primary py-1 px-5">
                                        Approve
                                    </Button>
                                    <br />
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )
            }
        </div >
    )
}