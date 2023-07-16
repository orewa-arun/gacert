import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useCertificationContext } from "../context/CertificationContext";
import { Profile } from "./Profile.jsx";

type UserDashboardProps = {
    isOpenDashboard: boolean,
}

export function UserDashboard({ isOpenDashboard }: UserDashboardProps) {

    const { closeDashboard, changeUser, user } = useCertificationContext();

    return (
        <Offcanvas show={isOpenDashboard} onHide={closeDashboard} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>User Profile :</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    <Profile publicKey={user} />
                    <span className="text-center fs-8">Your Unique ID :</span>
                    <span className="fw-bold fs-6">{user}</span>
                    <Button variant="light" onClick={changeUser}>Switch user</Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}