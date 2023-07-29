import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useCertificationContext } from "../context/CertificationContext";
import { Profile } from "./Profile";
import { useState } from "react";
import { Passport } from "./PassportClaim";
import { useNavigate } from "react-router-dom";
import { approveTransaction } from "../utilites/approverTransaction";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function PassportVerify() {

    const { user } = useCertificationContext();
    const navigate = useNavigate();

    const appliedValue = localStorage.getItem("applied");
    if (!appliedValue) console.log(appliedValue);

    const applied = (appliedValue === "true");

    localStorage.setItem("verified", "false");

    const recyclerAddress = "0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781";

    const isRecycler = (user === recyclerAddress);
    const auditorAddress = "0x8f4D3e323D63abaf0A9489D83b2c7B3a74220870";

    // const [verificationSignature, setVerificationSignature] = useLocalStorage("passportVerification", "");

    const jsonValue = localStorage.getItem("passport")!;
    if (!jsonValue) return null;

    const passportData: Passport = JSON.parse(jsonValue);
    const [submit, setSubmit] = useState(false);

    const [showRecycler, setShowRecycler] = useState(false);

    const show = () => {
        setShowRecycler(!showRecycler);
    }

    const [agreed, setAgreed] = useState(false);

    const handleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(e.target.checked);
    }

    const handleApproval = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmit(true);
        const approveTx = await approveTransaction(auditorAddress, 0, passportData);
        if (approveTx) {
            // setVerificationSignature(approveTx);
            localStorage.setItem("passportVerification", approveTx);
            localStorage.setItem("verified", "true");
            console.log(approveTx);
            navigate("/passportcertificates");
            alert(`Your approval is successful,check ${approveTx} to view on block explorer!!`);
        } else {
            alert("Transaction apply failed!!");
        }
    }

    return (
        <div>
            {applied && (
                <div>
                    {submit ? (
                        <div className="d-flex flex-column align-items-center my-5 gap-4">
                            <h4 className="text-muted">Your application is being proccessed!</h4>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <Spinner animation="grow" variant="success" />
                                <Spinner animation="grow" variant="success" />
                                <Spinner animation="grow" variant="success" />
                            </div>
                            <div className="d-flex justify-content-center">
                                <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                                <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                                <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center">
                            <Card style={{ width: '75rem' }}>
                                <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                                    <span className="fs-7 text-muted">Recycler's unique Id : {recyclerAddress}</span>
                                    <Button variant="info" onClick={show}>{showRecycler ? <span>Close</span> : <span>Recycler's details</span>}</Button>
                                </Card.Title>
                                <Card.Body>
                                    <Container>
                                        <Row className="d-flex align-items-center mb-3">
                                            <Col className="fw-bold" xs={10}>Batch id : {passportData.BatchTraceability}</Col>
                                            <Col className="fw-bold" xs={2}>Weight : {passportData.ProductWeight} kg</Col>
                                        </Row>
                                        {/* Columns are always 50% wide, on mobile and desktop */}
                                        <div className="d-flex justify-content-center">
                                            {showRecycler && <Profile publicKey={recyclerAddress} />}
                                        </div>
                                        <div className="border border-4 rounded mx-3">
                                            <h6 className="mt-4 text-center">Product details : </h6>
                                            <Row className="d-flex text-center align-items-center my-2">
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>product : </span>
                                                    <span>{passportData.ProductName}</span>
                                                </Col>
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>company : </span>
                                                    <span>{passportData.CompanyName}</span>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex text-center border-bottom align-items-center my-2">
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>product id : </span>
                                                    <span>{passportData.ProductId}</span>
                                                </Col>
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>location site : </span>
                                                    <span>{passportData.LocationName}</span>
                                                </Col>
                                            </Row>
                                            <h6 className="mt-4 text-center">Raw materials used : </h6>
                                            <Row className="d-flex text-center align-items-center my-2">
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>plastic : </span>
                                                    <span>{passportData.PlasticConsumptionPercentage} %</span>
                                                </Col>
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>metal : </span>
                                                    <span>{passportData.MetalConsumptionPercentage} %</span>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex text-center border-bottom align-items-center my-2">
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>wood : </span>
                                                    <span>{passportData.WoodConsumptionPercentage} %</span>
                                                </Col>
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>others : </span>
                                                    <span>{passportData.OtherConsumptionPercentage} %</span>
                                                </Col>
                                            </Row>
                                            <h6 className="mt-4 text-center">Energy and Water used : </h6>
                                            <Row className="d-flex text-center border-bottom align-items-center my-2">
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>energy consumed : </span>
                                                    <span>{passportData.EnergyConsumption} KWH</span>
                                                </Col>
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>water consumed : </span>
                                                    <span>{passportData.WaterConsumption} L</span>
                                                </Col>
                                            </Row>
                                            <h6 className="mt-4 text-center">Emissions : </h6>
                                            <Row className="d-flex text-center border-bottom align-items-center my-2">
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>GHG emission : </span>
                                                    <span>{passportData.GHGEmission} g CO2</span>
                                                </Col>
                                                <Col xs={6}>
                                                    <span style={{ color: "green" }}>scope emission : </span>
                                                    <span>{passportData.ScopeEmission} g CO2</span>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="mt-4 text-center d-flex justify-content-center align-items-center">
                                            <h5>End Of Life Collection Information : &#160;</h5>
                                            <h5 className="text-success">{passportData.EndOfLifeCollectionInformation}</h5>
                                        </div>
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
                                    </Container>
                                </Card.Body>
                            </Card >
                        </div >
                    )
                    }
                </div>
            )}
        </div>

    )
}