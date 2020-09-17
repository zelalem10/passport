import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PaymentSelection from '../Payment/PaymentSelection'
import API from '../Utils/API'
import token from '../common/accessToken'



const PayWithCBE = (props) => {
    const [resquestSent, setResquestSent] = useState(false);
    const [returnBack, setReturnBack] = useState(false)
    const [description, setDescription] = useState(false)
    const [status, setStatus]=useState(0)

    function hadndelBack() {
        setReturnBack(true)
    }
    const config = {
        headers: { Authorization: token }
    };
    useEffect(() => {
        const body = {
            firstName: 'Atalay',
            lastName: 'Tilahun',
            email: 'atehun@gmail.com',
            phone: "0932876051",
            amount: 10,
            currency: "ETB",
            city: "Addis Ababa",
            country: "Ethiopia",
            channel: "PSS",
            paymentOptionsId: 2,
            traceNumbers: "",
            Status: 4,
            OrderId: "",
            otp: "",
            requestId: 3,
        };
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => {
                setDescription(todo.data.statusDescription)
                setStatus(todo.data.status)
                console.log("MSG: ", todo.data);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
    }, [])
    return (
        returnBack === true ? (<PaymentSelection />) : (<MDBRow>
            <MDBCol md="1"></MDBCol>
            <MDBCol md="7">
                <MDBContainer>
                    <MDBCard style={{ marginTop: "1rem" }}>
                        <MDBCardHeader color="primary-color" tag="h3">
                            Instruction
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>Pay with CBE</MDBCardTitle>
                            <MDBCardText>{props.instruction} </MDBCardText>
                            <MDBBtn color="warning" size="sm"onClick={hadndelBack}> Back to selection </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </MDBCol>
        </MDBRow>)

    )
}

export default PayWithCBE;