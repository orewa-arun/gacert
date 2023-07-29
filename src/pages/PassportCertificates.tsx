import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Passport } from "../components/PassportClaim";
import { useState } from "react";
import { Profile } from "../components/Profile";
import { useCertificationContext } from "../context/CertificationContext";
import { Link } from "react-router-dom";

export function PassportCertificates() {

    const jsonValue = localStorage.getItem("passport")!;
    if (!jsonValue) return null;

    const verifiedValue = localStorage.getItem("verified")!;
    if (verifiedValue) console.log(verifiedValue);

    const verified = (verifiedValue === "true");

    const applySig = localStorage.getItem("passportApplication")!;
    const approveSig = localStorage.getItem("passportVerification")!;
    const claimApply = localStorage.getItem("claimApply")!;
    const claimApproval = localStorage.getItem("claimApproval")!;

    const passportData: Passport = JSON.parse(jsonValue);

    const recyclerAddress = "0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781";
    const auditorAddress = "0x8f4D3e323D63abaf0A9489D83b2c7B3a74220870";

    const recyclerName = "Rajesh Kumar";
    const wmaName = "Suresh";

    const { user } = useCertificationContext();

    const isRecycler = (user === recyclerAddress);

    const [showRecycler, setShowRecycler] = useState(false);
    const [showAuditor, setShowAuditor] = useState(false);

    const handleRecycler = () => {
        setShowRecycler(!showRecycler);
    }

    const handleAuditor = () => {
        setShowAuditor(!showAuditor);
    }

    return (
        <div>
            {verified && (
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '75rem' }}>
                        <h3 className="mx-4 my-4">Green Aadhaar Blockchain based digital passport</h3>
                        <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                            <Button variant="info" onClick={handleRecycler}>{showRecycler ? <span>Close</span> : <span>Recycler's details</span>}</Button>
                            <Button variant="info" onClick={handleAuditor}>{showAuditor ? <span>Close</span> : <span>Auditor's details</span>}</Button>
                        </Card.Title>
                        <Card.Body>
                            <Container>
                                <Row className="d-flex align-items-center mb-3">
                                    <Col className="fw-bold" xs={10}>Batch id : {passportData.BatchTraceability}</Col>
                                    <Col className="fw-bold" xs={2}>Weight : {passportData.ProductWeight} g</Col>
                                </Row>
                                {/* Columns are always 50% wide, on mobile and desktop */}
                                <div className="d-flex justify-content-center">
                                    {showRecycler && <Profile publicKey={recyclerAddress} />}
                                    {showAuditor && <Profile publicKey={auditorAddress} />}
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
                                    <h6 className="mt-4 text-center">Energy and Water saved : </h6>
                                    <Row className="d-flex text-center border-bottom align-items-center my-2">
                                        <Col xs={6}>
                                            <span style={{ color: "green" }}>energy saved : </span>
                                            <span>{passportData.EnergyConsumption} KWH</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span style={{ color: "green" }}>water saved : </span>
                                            <span>{passportData.WaterConsumption} L</span>
                                        </Col>
                                    </Row>
                                    <h6 className="mt-4 text-center">Emissions : </h6>
                                    <Row className="d-flex text-center border-bottom align-items-center my-2">
                                        <Col xs={6}>
                                            <span style={{ color: "green" }}>GHG emission reduced: </span>
                                            <span>{passportData.GHGEmission} g CO2</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span style={{ color: "green" }}>scope emission reduced: </span>
                                            <span>{passportData.ScopeEmission} g CO2</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-4 text-center d-flex justify-content-center align-items-center">
                                    <h5>End Of Life Collection Information : &#160;</h5>
                                    <h5 className="text-success">{passportData.EndOfLifeCollectionInformation}</h5>
                                </div>
                                <h4 className="mx-5 my-3">Chain of Custody : </h4>
                            </Container>
                            <Container className="mt-5" style={{ width: "50rem" }}>
                                <Row className="d-flex text-center align-items-center my-2">
                                    <Col className="d-flex align-items-center">
                                        <img style={{ width: "3.5rem" }} src="/imgs/bullet.png" />
                                        <span className="fs-6 fw-bold">&#160;{recyclerName} (Recycler)</span>
                                        <span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</span>
                                        <Link className="fw-bold" to={applySig}>Rajesh</Link>
                                        <span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</span>
                                        <Link className="fw-bold" to={approveSig}>Auditor</Link>
                                    </Col>
                                </Row>
                                <div className="mx-4" style={{ borderLeft: "6px solid grey" }}>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                <Row className="d-flex text-center align-items-center my-2">
                                    <Col className="d-flex align-items-center">
                                        <img style={{ width: "3.5rem" }} src="/imgs/bullet.png" />
                                        <span className="fs-6 fw-bold">&#160;{wmaName} (WMA)</span>
                                        <span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</span>
                                        <Link className="fw-bold" to={claimApply}>Suresh</Link>
                                        <span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</span>
                                        <Link className="fw-bold" to={claimApproval}>Rajesh</Link>
                                    </Col>
                                </Row>
                            </Container>

                        </Card.Body>
                    </Card >
                </div >
            )}
        </div>
    )
}