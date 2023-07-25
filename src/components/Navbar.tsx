import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCertificationContext } from "../context/CertificationContext";


export function Navbar() {

    const { openDashboard, user } = useCertificationContext();
    const wmaAddress = "0xF32ceD175171E3D5D80072Db124139FD929af2AE";
    const recyclerAddress = "0x180Aa54f13779b1D6b550B42Ed8d1FF200A0D781";
    const auditorAddress = "0x8f4D3e323D63abaf0A9489D83b2c7B3a74220870";

    const isWMA = (user === wmaAddress);
    const isRecycler = (user === recyclerAddress);
    const isAuditor = (user === auditorAddress);

    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 mt-1">
            <Container className="d-flex justify-content-between">
                <Nav className="me-auto">
                    {
                        isWMA && (
                            <div className="d-flex">
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
                            </div>
                        )
                    }
                    {
                        (isRecycler || isAuditor) && (
                            <div className="d-flex">
                                <Nav.Link to="/passporthome" as={NavLink} className="mx-2">
                                    home
                                    <img src="/imgs/home.svg" style={{
                                        height: "1.5rem",
                                        width: "1.5rem",
                                        transform: "translate(25%,-13%)"
                                    }} />
                                </Nav.Link>
                                <Nav.Link to="/passportcertificates" as={NavLink} className="mx-2">
                                    passport certificates
                                    <img src="/imgs/certificates.svg" style={{
                                        height: "1.5rem",
                                        width: "1.5rem",
                                        transform: "translate(25%,-13%)"
                                    }} />
                                </Nav.Link>
                            </div>
                        )
                    }
                    {
                        isRecycler && (
                            <Nav.Link to="/applypassport" as={NavLink} className="mx-2">
                                apply for digital passport
                                <img src="/imgs/apply.svg" style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    transform: "translate(25%,-13%)"
                                }} />
                            </Nav.Link>
                        )
                    }

                </Nav>
                <div>
                    User : {user}
                    <Button style={{ height: "3.5rem", width: "3.5rem" }}
                        variant="outline-warning"
                        className="rounded-circle"
                        onClick={openDashboard}>
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