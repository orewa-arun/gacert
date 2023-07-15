import { Button, Form } from "react-bootstrap";

type ApplicationFormProps = {
    handlePlasticSubmit(e: React.FormEvent<HTMLFormElement>): void,
    handleCheckChange(e: React.ChangeEvent<HTMLInputElement>): void,
    handlePlasticTypeChange(e: React.ChangeEvent<HTMLSelectElement>): void,
    handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>): void,
    sendChecked: boolean,
    receiveChecked: boolean,
}

export function ApplicationForm({
    handlePlasticSubmit,
    handleCheckChange,
    handlePlasticTypeChange,
    handleQuantityChange,
    sendChecked,
    receiveChecked,
}: ApplicationFormProps) {
    return (

        <Form onSubmit={handlePlasticSubmit}>
            <h3>Plastic details :</h3>

            <Form.Group className="mb-3" controlId="formTypeOfTransaction">
                <Form.Label>Did you send plastic or receive plastic?</Form.Label>
                <div className="d-flex justify-content-around align-items-center" style={{ height: "2.5rem", backgroundColor: "#e9fabe" }}>
                    <Form.Check
                        type="checkbox"
                        id="send-checkbox"
                        checked={sendChecked}
                        onChange={handleCheckChange}
                        label="send"
                    />
                    <Form.Check
                        type="checkbox"
                        id="receive-checkbox"
                        checked={receiveChecked}
                        onChange={handleCheckChange}
                        label="receive"
                    />
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaticType">
                <Form.Label>Plastic type:</Form.Label>
                <Form.Select name="plasticType" onChange={handlePlasticTypeChange}>
                    <option>Select the plastic type involved in transaction</option>
                    <option value="1">Polyethylene Terephthalate (PET), Ex : water bottles and plastic trays</option>
                    <option value="2">High Density Polyethylene (HDPE), Ex : milk cartoons and shampoo bottles</option>
                    <option value="3">Polypropylene (PP), Ex : margarine tubs and ready-meal trays</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-5" controlId="formPlasticQuantity">
                <Form.Label>Plastic Quantity (In kg) :</Form.Label>
                <Form.Control type="number" name="plasticQuantity" onChange={handleQuantityChange} placeholder="Quantity" />
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