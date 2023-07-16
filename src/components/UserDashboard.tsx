import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useCertificationContext } from "../context/CertificationContext";
import { Profile } from "./Profile.jsx";

type ShoppingCartProps = {
    isOpenDashboard: boolean,
    user: string,
}

export function UserDashboard({ isOpenDashboard, user }: ShoppingCartProps) {

    const { closeDashboard, changeUser } = useCertificationContext();

    return (
        <Offcanvas show={isOpenDashboard} onHide={closeDashboard} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>User Profile :</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    <Profile publicKey={user} />
                    <Button variant="light" onClick={changeUser}>Switch user</Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}