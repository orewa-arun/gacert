import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Apply } from "./pages/Apply";
import { Certificates } from "./pages/Certificates";
import { Navbar } from "./components/Navbar.jsx";
import { CertificationProvider } from "./context/CertificationContext.js";
import { PlasticPassportFiling } from "./components/PlasticPassportFiling.jsx";
import { PassportCertificates } from "./pages/PassportCertificates.js";
import { PassportHome } from "./pages/PassportHome.js";

export function App() {

    return (
        <>
            <CertificationProvider>
                <Navbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/apply" element={<Apply />} />
                        <Route path="/certificates" element={<Certificates />} />
                        <Route path="/applypassport" element={<PlasticPassportFiling />} />
                        <Route path="/passportcertificates" element={<PassportCertificates />} />
                        <Route path="/passporthome" element={<PassportHome />} />
                    </Routes>
                </Container >
            </CertificationProvider>
        </>
    )
}