import { useState } from "react";
import profiles from "../data/profiles.json";
import { VerificationForm } from "../components/VerificationForm.js";
import { ApplicationForm } from "../components/ApplicationForm.js";
import { useCertificationContext } from "../context/CertificationContext.js";
import { useNavigate } from "react-router-dom";
import { applyTransaction } from "../utilites/applyTransaction.js";
import { Spinner } from "react-bootstrap";

export function Apply() {

    const navigate = useNavigate();

    const { addClaim, user, addApplierSignature } = useCertificationContext();

    const [approverData, setApproverData] = useState({
        mobileNo: "",
        DOB: "",
        publicKey: ""
    });

    const [submitLoading, setSubmitLoading] = useState(false);

    const [verified, setIsVerified] = useState(false);

    const [sendChecked, setSendChecked] = useState<boolean>(false);
    const [receiveChecked, setReceiveChecked] = useState<boolean>(false);

    const [plasticData, setPlasticData] = useState({
        "plasticType": "",
        "plasticQuantity": 0
    })

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        if (id === "receive-checkbox") {
            setReceiveChecked(checked);
            setSendChecked(!checked);
        } else if (id === "send-checkbox") {
            setReceiveChecked(!checked);
            setSendChecked(checked);
        }
    }

    const handlePlasticTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPlasticData((previousData) => ({ ...previousData, [name]: value }));
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlasticData((previousData) => ({ ...previousData, [name]: value }));
    }

    const handlePlasticSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // alert(`${sendChecked},${plasticData.plasticType},${plasticData.plasticQuantity}`);
        const id = addClaim(user, approverData.publicKey, sendChecked, plasticData.plasticType, plasticData.plasticQuantity, false);
        console.log(id);
        setSubmitLoading(true);
        const applyTx = await applyTransaction(user, id, approverData.publicKey);
        if (applyTx) {
            addApplierSignature(id, applyTx);
            console.log(applyTx);
            navigate("/");
            alert(`Your application is successful,check ${applyTx} to view on block explorer!!`);
        } else {
            alert("Transaction apply failed!!");
        }

    }

    const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setApproverData((previousData) => ({ ...previousData, [name]: value }));
    };

    const handleVerifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // prevents erasure of entered data, stops all event behaviour
        e.preventDefault();
        if (profiles.find(p => {
            if (p.mobileNo === approverData.mobileNo && p.DOB === approverData.DOB) {
                return p
            }
        })?.publicKey === approverData.publicKey) {
            setIsVerified(true);
            // alert(`${approverData.mobileNo},${approverData.DOB},${approverData.publicKey}`);
        } else {
            alert("Verification Error!,check the entered details properly");
        }
    }

    return (
        <>
            {submitLoading ? (
                <div className="d-flex flex-column align-items-center my-5 gap-4">
                    <h4 className="text-muted">Your application is being proccessed!</h4>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="success" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                        <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                        <img src="/imgs/bee.png" style={{ width: "4rem", height: "4rem" }} />
                    </div>
                </div>
            ) : (
                <div>
                    <VerificationForm {...{
                        handleVerifySubmit,
                        handleVerifyChange,
                        verified,
                        approverData
                    }} />

                    <ApplicationForm {...{
                        handlePlasticSubmit,
                        handleCheckChange,
                        handlePlasticTypeChange,
                        handleQuantityChange,
                        sendChecked,
                        receiveChecked,
                        verified,
                        plasticData
                    }} />
                </div>
            )
            }
        </>
    )
}