import { Offcanvas, Stack } from "react-bootstrap";
import { useCertificationContext } from "../context/CertificationContext";

type ShoppingCartProps = {
    isOpen: boolean
}

export function UserDashboard({ isOpen }: ShoppingCartProps) {

    const { closeDashboard } = useCertificationContext();

    return (
        <Offcanvas show={isOpen} onHide={closeDashboard} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>User</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>

                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}