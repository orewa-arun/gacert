import { Card, Col, Container, Row } from "react-bootstrap";
import profiles from "../data/profiles.json";

type ProfileProps = {
    publicKey: string;
}

export function Profile({ publicKey }: ProfileProps) {
    const profile = profiles.find(p => p.publicKey === publicKey);
    if (profile == null) {
        return <h2>profile not available</h2>
    }

    return (
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={profile.imgURL}
                height="300px"
                width="300px"
                style={{ objectFit: "cover" }}
            />
            <Card.Body>
                <Container>
                    {/* Columns are always 50% wide, on mobile and desktop */}
                    <Row className="d-flex align-items-center">
                        <Col className="fw-bold fs-5" xs={4}>Name :</Col>
                        <Col className="fs-5" xs={6}>{profile.Name}</Col>
                    </Row>
                    <Row className="d-flex align-items-center">
                        <Col className="fw-bold fs-5" xs={4}>Role :</Col>
                        <Col className="fs-5" xs={6}>{profile.Role}</Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}