import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Apply } from "./pages/Apply";
import { Certificates } from "./pages/Certificates";
import { Navbar } from "./components/Navbar.jsx";

export function App() {
    return (
        <>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/certificates" element={<Certificates />} />
                </Routes>
            </Container >
        </>
    )
}