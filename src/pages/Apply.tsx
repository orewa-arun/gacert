import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import profiles from "../data/profiles.json";
import { Profile } from "../components/Profile.jsx";

export function Apply() {
    const [approverData, setApproverData] = useState({
        "mobileNo": "",
        "DOB": "",
        "publicKey": ""
    });

    const [verified, setVerified] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setApproverData((previousData) => ({ ...previousData, [name]: value }));
    };

    const handleVerifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // prevents erasure of entered data, stops all event behaviour
        e.preventDefault();
        if (profiles.find(p => {
            if (p.mobileNo === approverData.mobileNo && p.DOB === approverData.DOB) {
                return p
            }
        })?.publicKey === approverData.publicKey) {
            setVerified(true);
            // alert(`${approverData.mobileNo},${approverData.DOB},${approverData.publicKey}`);
        } else {
            alert("Verification Error!,check the entered details properly");
        }
    }

    return (
        <>
            <Form onSubmit={handleVerifySubmit}>
                <h3>Approver's details :</h3>
                <Form.Group className="mb-3" controlId="formEthId">
                    <Form.Label>Approver's mobile number :</Form.Label>
                    <Form.Control type="text" name="mobileNo" value={approverData.mobileNo} onChange={handleChange} placeholder="Enter approver's mobile number" />
                    <Form.Text className="text-muted">
                        Enter without (+91)
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formEthId">
                    <Form.Label>Approver's Date of birth :</Form.Label>
                    <Form.Control type="date" name="DOB" value={approverData.DOB} onChange={handleChange} placeholder="Date of Birth" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEthId">
                    <Form.Label>Approver's Blockchain ID :</Form.Label>
                    <Form.Control type="text" name="publicKey" value={approverData.publicKey} onChange={handleChange} placeholder="Enter the unique ID of the approver" />
                    <Form.Text className="text-muted">
                        We'll never share your Real Identity with anyone
                    </Form.Text>
                </Form.Group>

                {verified ? (
                    <Profile publicKey={approverData.publicKey} />
                ) : (
                    <Button variant="info" className="mb-5" type="submit">
                        Verify Identity
                    </Button>
                )}

            </Form>

            <Form>
                <h3>Plastic details :</h3>

                <Form.Group className="mb-3" controlId="formTypeOfTransaction">
                    <Form.Label>Did you send plastic or receive plastic?</Form.Label>
                    <div className="d-flex justify-content-around align-items-center" style={{ height: "2.5rem", backgroundColor: "#e9fabe" }}>
                        <Form.Check
                            type="checkbox"
                            id="default-checkbox"
                            label="send"
                        />
                        <Form.Check
                            type="checkbox"
                            id="default-checkbox"
                            label="receive"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPlaticType">
                    <Form.Label>Plastic type:</Form.Label>
                    <Form.Select>
                        <option>Select the plastic type involved in transaction</option>
                        <option value="1">Polyethylene Terephthalate (PET), Ex : water bottles and plastic trays</option>
                        <option value="2">High Density Polyethylene (HDPE), Ex : milk cartoons and shampoo bottles</option>
                        <option value="3">Polypropylene (PP), Ex : margarine tubs and ready-meal trays</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-5" controlId="formPlasticQuantity">
                    <Form.Label>Plastic Quantity (In kg) :</Form.Label>
                    <Form.Control type="number" placeholder="Quantity" />
                    <Form.Text className="text-muted">
                        We appreciate your honesty!,try to be as accurate as possible
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAgreeCheckbox" style={{ backgroundColor: "#fadf48" }}>
                    <Form.Check
                        type="checkbox"
                        label="I hereby declare that the information furnished above is true, 
                    complete and correct to the best of my knowledge and belief."
                        className="mx-2"
                    />
                </Form.Group>
                <div className="text-center">
                    <Button type="submit" className="btn btn-primary py-1 px-3">
                        Submit
                    </Button>
                    <br />
                    <br />
                    <br />
                </div>
            </Form>
        </>
    )
}