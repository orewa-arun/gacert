import { useState } from "react";
import { Col, Container, Row, Form, Button, Stack, Spinner } from "react-bootstrap";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useCertificationContext } from "../context/CertificationContext";
import { useNavigate } from "react-router-dom";
import { applyTransaction } from "../utilites/applyTransaction";

export function PlasticPassportFiling() {

    const navigate = useNavigate();
    localStorage.setItem("applied", "false");

    const { user } = useCertificationContext();

    const [submit, setSubmit] = useState(false);

    const key = "passport";
    const [passportData, setPassportData] = useLocalStorage(key, {
        ProductName: "",
        CompanyName: "",
        ProductId: "",
        LocationName: "",
        ProductWeight: "",
        BatchTraceability: "",
        PlasticConsumption: "",
        PlasticConsumptionPercentage: "",
        MetalConsumption: "",
        MetalConsumptionPercentage: "",
        WoodConsumption: "",
        WoodConsumptionPercentage: "",
        OtherConsumption: "",
        OtherConsumptionPercentage: "",
        EnergyConsumption: "",
        WaterConsumption: "",
        GHGEmission: "",
        ScopeEmission: "",
        EndOfLifeCollectionInformation: "",
    });

    // const [applicationSignature, setApplicationSignature] = useLocalStorage("passportApplication", "");

    const [agreed, setAgreed] = useState(false);

    const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassportData((previousData) => ({ ...previousData, [name]: value }));
    }

    const recyclerAddress = "0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781";
    const auditorAddress = "0x8f4D3e323D63abaf0A9489D83b2c7B3a74220870";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmit(true);
        const applyTx = await applyTransaction(user, 0, auditorAddress, passportData);
        if (applyTx) {
            // setApplicationSignature(applyTx);
            localStorage.setItem("passportApplication", applyTx);
            localStorage.setItem("applied", "true");
            // console.log(applyTx);
            navigate('/passporthome');
            alert(`Your application is successful,check ${applyTx} to view on block explorer!!`);
        } else {
            alert("Transaction apply failed!!");
        }
    }

    const handleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(e.target.checked);
    }

    return (
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
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <h3>Product Details : </h3>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formProductName">
                                    <Form.Label>Product Name:</Form.Label>
                                    <Form.Control type="text"
                                        name="ProductName"
                                        onChange={handlePassportChange}
                                        placeholder="Enter product Name" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formCompanyName">
                                    <Form.Label>Company Name:</Form.Label>
                                    <Form.Control type="text"
                                        name="CompanyName"
                                        onChange={handlePassportChange}
                                        placeholder="Enter company Name" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formProductId">
                                    <Form.Label>Product Id:</Form.Label>
                                    <Form.Control type="text"
                                        name="ProductId"
                                        onChange={handlePassportChange}
                                        placeholder="Enter product Id" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formLocationName">
                                    <Form.Label>Location Name:</Form.Label>
                                    <Form.Control type="text"
                                        onChange={handlePassportChange}
                                        name="LocationName"
                                        placeholder="Enter Location Name" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formProductWeight">
                                    <Form.Label>Weight of product (in g):</Form.Label>
                                    <Form.Control type="text"
                                        onChange={handlePassportChange}
                                        name="ProductWeight"
                                        placeholder="Enter product Weight in g" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBatchTraceability">
                                    <Form.Label>Batch Traceability Id:</Form.Label>
                                    <Form.Control type="text"
                                        onChange={handlePassportChange}
                                        name="BatchTraceability"
                                        placeholder="Enter batch traceability (Previous transaction hash)" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <h3>Recyling Information : </h3>
                        <Form.Group className="mb-3" controlId="formRawMaterial">
                            <Form.Label className="fs-5">Raw material consumption:</Form.Label>
                            <Container>
                                <Stack gap={2}>
                                    <Row>
                                        <Col sm={10}>
                                            <Form.Label>Plastic:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="PlasticConsumption"
                                                placeholder="Enter type of plastics used" />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>Percentage:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="PlasticConsumptionPercentage"
                                                placeholder="Enter %" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={10}>
                                            <Form.Label>Metal:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="MetalConsumption"
                                                placeholder="Enter type of metals used" />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>Percentage:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="MetalConsumptionPercentage"
                                                placeholder="Enter %" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={10}>
                                            <Form.Label>wood:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="WoodConsumption"
                                                placeholder="Enter type of wood" />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>Percentage:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="WoodConsumptionPercentage"
                                                placeholder="Enter %" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={10}>
                                            <Form.Label>Additives/Dyes/Others:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="OtherConsumption"
                                                placeholder="Enter other raw materials" />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>Percentage:</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handlePassportChange}
                                                name="OtherConsumptionPercentage"
                                                placeholder="Enter %" />
                                        </Col>
                                    </Row>
                                </Stack>
                            </Container>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEnergyConsumption">
                            <Form.Label>Energy Consumption (in KWH):</Form.Label>
                            <Form.Control type="text"
                                onChange={handlePassportChange}
                                name="EnergyConsumption"
                                placeholder="Enter energy consumption" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formWaterConsumption">
                            <Form.Label>Water Consumption (in L):</Form.Label>
                            <Form.Control type="text"
                                onChange={handlePassportChange}
                                name="WaterConsumption"
                                placeholder="Enter water consumption" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGHGEmission">
                            <Form.Label>GHG Emission (in g CO2):</Form.Label>
                            <Form.Control type="text"
                                onChange={handlePassportChange}
                                name="GHGEmission"
                                placeholder="Enter GHG Emission" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formScopeEmission">
                            <Form.Label>Scope Emission (in g CO2):</Form.Label>
                            <Form.Control type="text"
                                onChange={handlePassportChange}
                                name="ScopeEmission"
                                placeholder="Enter Scope Emission" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEndOfLifeCollectionInformation">
                            <Form.Label>End of life collection information:</Form.Label>
                            <Form.Control type="text"
                                onChange={handlePassportChange}
                                name="EndOfLifeCollectionInformation"
                                placeholder="Enter end of life collection information" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAgreeCheckbox" style={{ backgroundColor: "#fadf48" }}>
                            <Form.Check
                                type="checkbox"
                                onChange={handleAgree}
                                label="I hereby declare that the information furnished above is true, 
                    complete and correct to the best of my knowledge and belief."
                                className="mx-2"
                            />
                        </Form.Group>
                        <div className="text-center" >
                            <Button className="px-4 mt-3" type="submit" disabled={!agreed}>Submit</Button>
                        </div>
                        <br />
                        <br />
                    </Container >
                </Form >
            )}
        </div >
    )
}