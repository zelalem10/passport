import React, { useState, useEffect } from 'react';
import { MDBBtn,MDBInput, MDBCard, MDBCardHeader, MDBContainer, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PayWithAmole from '../Payment/PayWithAmole'
import PayWithCBEBirr from '../Payment/PayWithCBEBirr'
import PayWithHibret from '../Payment/PayWithHibret'
import PayWithPSS from '../Payment/PayWithPSS'
import PayWithAbyssinia from '../Payment/PayWithAbyssinia'
import API from '../Utils/API'
import token from '../common/accessToken'
import Response from '../Payment/Responses/Success'



const CardExample = () => {
    const [selectedOption, setSelectedOption] = useState();
    const [optionSelected, setOptionSelected] = useState(false);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [requestSubmited, setRequestSubmited] = useState(false);
    const [instruction, setInstruction] = useState("");
    const [message, setMessage] = useState("");
    const [flowType, setFlowType] = useState(0);
    const [status, setStatus] = useState(0);


    const config = {
        headers: { Authorization: token }
    };
    function getSelectedOption(id) {
        const config = {
            headers: { Authorization: token }
        };
        const body = {
            firstName: 'Atalay',
            lastName: 'Tilahun',
            email: 'atehun@gmail.com',
            phone: "0932876051",
            amount: 10,
            currency: "ETB",
            city: "Addis Ababa",
            country: "Ethiopia",
            channel: "Amole",
            paymentOptionsId: id,
            traceNumbers: "",
            Status: 4,
            OrderId: "",
            otp: "",
            requestId: 3,
        };
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => {
                console.log(todo.data)
                setStatus(todo.data.status)
                setInstruction(todo.data.instruction)
                setFlowType(todo.data.paymentFlowType)
                setMessage(todo.data.message)
                setRequestSubmited(true)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
    }
    function getContent(paymentFlowType) {
        switch (paymentFlowType) {
            case 1:
                return <Response instruction={instruction} message={message} status={status} />
        }
    }
    useEffect(() => {
        API.get("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/GetPaymentOptions", config)
            .then((todo) => setPaymentOptions(todo.data.paymentOptions))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }, [])
    const handelClick = (optionCode) => {
        setSelectedOption(optionCode);
        setOptionSelected(true);
    }

    return (
        requestSubmited===false ?
        (
        optionSelected === false ?
            (
                <MDBContainer>
                    <MDBCard style={{ marginTop: "1rem" }}>
                        <MDBCardHeader color="primary-color" tag="h3">
                            Select payment option to pay
                        </MDBCardHeader>
                            <MDBCardBody>
                            <MDBRow>
                            <MDBCol md="4" style={{ marginBottom: "5px" }}>
                                {paymentOptions.map((paymentOption) =>
                                        <MDBCard>
                                            <MDBCardImage className="img-fluid" src="https://dashenbanksc.com/wp-content/themes/dashen-bank/assets/img/logo.png"
                                                waves />
                                            <MDBCardBody>
                                                <MDBCardTitle>{paymentOption.name}</MDBCardTitle>
                                                <MDBCardText></MDBCardText>
                                                {paymentOption.instruction}
                                            </MDBCardBody>
                                            <MDBBtn onClick={() => getSelectedOption(paymentOption.id)}>Select</MDBBtn>
                                        </MDBCard>
                                        // <MDBInput label={paymentOption.name} type="radio" id="radio1" />
                                )
                                }
                            </MDBCol>
                            <MDBCol md="4" style={{ marginBottom: "5px" }}></MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            ) 
            :
            (
                <div>{getSelectedOption(selectedOption)}</div>
            )
        )
        :
        (getContent(flowType))
    )
}
export default CardExample;