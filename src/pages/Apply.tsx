import { Button, Form } from "react-bootstrap";

export function Apply() {
    return (
        <Form>
            <h3>Approver's details :</h3>
            <Form.Group className="mb-3" controlId="formEthId">
                <Form.Label>Approver's mobile number :</Form.Label>
                <Form.Control type="text" placeholder="Enter the unique ID of the approver" />
                <Form.Text className="text-muted">
                    We'll never share your Real Identity with anyone
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEthId">
                <Form.Label>Approver's Date of birth :</Form.Label>
                <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                <Form.Text className="text-muted">
                    We'll never share your Real Identity with anyone
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEthId">
                <Form.Label>Approver's Blockchain ID :</Form.Label>
                <Form.Control type="text" placeholder="Enter the unique ID of the approver" />
                <Form.Text className="text-muted">
                    We'll never share your Real Identity with anyone
                </Form.Text>
            </Form.Group>

            <Button variant="info" className="mb-5" type="submit">
                Verify Identity
            </Button>

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
    )
}