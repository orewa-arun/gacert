import { Route, Router, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Apply } from "./pages/Apply";
import { Certificates } from "./pages/Certificates";

export function App() {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Home auth={true} />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/certificates" element={<Certificates />} />
            </Routes>
        </Container >
    )
}