import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";


export function Navbar() {
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 mt-1">
            <Container className="d-flex justify-content-between">
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink} className="mx-2">
                        Home
                        <img src="/imgs/home.svg" style={{
                            height: "1.5rem",
                            width: "1.5rem",
                            transform: "translate(25%,-13%)"
                        }} />
                    </Nav.Link>
                    <Nav.Link to="/apply" as={NavLink} className="mx-2">
                        Apply
                        <img src="/imgs/apply.svg" style={{
                            height: "1.5rem",
                            width: "1.5rem",
                            transform: "translate(25%,-13%)"
                        }} />
                    </Nav.Link>
                    <Nav.Link to="/certificates" as={NavLink} className="mx-2">
                        Certificates
                        <img src="/imgs/certificates.svg" style={{
                            height: "1.5rem",
                            width: "1.5rem",
                            transform: "translate(25%,-13%)"
                        }} />
                    </Nav.Link>
                </Nav>
                <div>
                    USER
                    <Button style={{ height: "3.5rem", width: "3.5rem" }}
                        variant="outline-primary"
                        className="rounded-circle">
                        <img src="/imgs/bee.png" style={{
                            height: "3rem",
                            width: "3rem",
                            transform: "translate(-15%,-10%)"
                        }} />
                    </Button>
                </div>

            </Container>
        </NavbarBs>
    )
}