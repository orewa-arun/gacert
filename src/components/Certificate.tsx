import { Card, Container, Row, Col, Stack } from "react-bootstrap"
import { useCertificationContext } from "../context/CertificationContext"

type CertificateProps = {
    id: number,
    applierAddress: string,
    verifierAddress: string,
    isSender: boolean,
    plasticType: string,
    plasticQuantity: number
}

export function Certificate({
    id,
    applierAddress,
    verifierAddress,
    isSender,
    plasticType,
    plasticQuantity
}: CertificateProps) {

    const { getSignature } = useCertificationContext();

    const signature = getSignature(id);

    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '75rem' }}>
                <Stack gap={2}>
                    <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                        <span className="fs-7 text-muted">Applier's unique Id : {applierAddress}</span>
                    </Card.Title>
                    <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                        <span className="fs-7 text-muted">Applier's signature : {signature?.applierSignature}</span>
                    </Card.Title>
                    <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                        <span className="fs-7 text-muted">Approver's unique Id : {verifierAddress}</span>
                    </Card.Title>
                    <Card.Title className="d-flex justify-content-between 
                        align-items-baseline mb-4 px-3 my-2">
                        <span className="fs-7 text-muted">Approver's signature : {signature?.approverSignature}</span>
                    </Card.Title>
                </Stack>

                <Card.Body>
                    <Container>
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
    )
}

