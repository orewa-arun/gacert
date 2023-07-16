import { Button, Form } from "react-bootstrap";
import { Profile } from "./Profile.jsx";

type VerificationFormProps = {
    handleVerifySubmit(e: React.FormEvent<HTMLFormElement>): void,
    handleVerifyChange(e: React.ChangeEvent<HTMLInputElement>): void,
    verified: boolean,
    approverData: {
        mobileNo: string,
        DOB: string,
        publicKey: string
    }
}

export function VerificationForm({
    handleVerifySubmit,
    handleVerifyChange,
    verified,
    approverData
}: VerificationFormProps) {
    return (
        <Form onSubmit={handleVerifySubmit}>
            <h3>Approver's details :</h3>
            <Form.Group className="mb-3" controlId="formEthId">
                <Form.Label>Approver's mobile number :</Form.Label>
                <Form.Control type="text" name="mobileNo" value={approverData.mobileNo} onChange={handleVerifyChange} placeholder="Enter approver's mobile number" />
                <Form.Text className="text-muted">
                    Enter without (+91)
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEthId">
                <Form.Label>Approver's Date of birth :</Form.Label>
                <Form.Control type="date" name="DOB" value={approverData.DOB} onChange={handleVerifyChange} placeholder="Date of Birth" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEthId">
                <Form.Label>Approver's Blockchain ID :</Form.Label>
                <Form.Control type="text" name="publicKey" value={approverData.publicKey} onChange={handleVerifyChange} placeholder="Enter the unique ID of the approver" />
                <Form.Text className="text-muted">
                    We'll never share your Real Identity with anyone
                </Form.Text>
            </Form.Group>

            {verified ? (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h5>Verified Approver's Profile :</h5>
                    <Profile publicKey={approverData.publicKey} />
                </div>
            ) : (
                <Button variant="info" className="mb-5" type="submit">
                    Verify Identity
                </Button>
            )}

        </Form>
    )
}