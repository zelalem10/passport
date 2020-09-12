import React, { useState,useEffect } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import PaymentSelection from '../Payment/PaymentSelection'
import SuccessPage from './Responses/Success'
import ErrorPage from './Responses/ErrorPage'
import WarningPage from './Responses/WarningPage'
import API from '../Utils/API'
import token from '../common/accessToken'


const CardExample = () => {
    const [resquestSent, setResquestSent] = useState(false);
    const [requestSubmited, setRequestSubmited] = useState(false);
    const [returnBack, setReturnBack] = useState(false)
    const [response, setResponse]=useState("warning")
    const [otp, setOTP] = useState("")

    function getResponseContent() {
        switch (response) {
          case "success":
            return <SuccessPage />;
          case "error":
            return <ErrorPage />;
          case "warning":
            return <WarningPage />;
          default:
            return 'Unknown stepIndex';
        }
      }
    function handelOTPChange(e){
        setOTP(e.target.value)
    }
    function hadndelBack() {
        setReturnBack(true)
    }
    function handelRequest(){
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
            paymentOptionsId: 1,
            traceNumbers: "",
            Status: 4,
            OrderId: "",
            otp: "",
            requestId: 3,
        };
        API.post("http://svdrbas03:2026/Amole/api/V1.0/Amole/RequestPay", body, config)
            .then((todo) => console.log(todo.data))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
        setResquestSent(true)
    }
    function handelSubmit(){
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
            paymentOptionsId: 1,
            traceNumbers: "",
            Status: 4,
            OrderId: "",
            otp: otp,
            requestId: 3,
        };
        API.post("http://svdrbas03:2026/Amole/api/V1.0/Amole/RequestPay", body, config)
            .then((todo) => 
            {
                console.log(todo.data)
                setRequestSubmited(true)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
    }
    return (
        requestSubmited==true? (getResponseContent())
        :(returnBack === true ? (<PaymentSelection />) 
        : (<MDBRow>
                <MDBCol md="1"></MDBCol>
                <MDBCol md="5">
                    <MDBCard>
                        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                            waves />
                        <MDBCardBody>
                            <Form>
                                {resquestSent === true ? (null) : (
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Amount(ETB)</Form.Label>
                                        <Form.Control type="text" disabled value="1000" />
                                    </Form.Group>)}
                                {resquestSent === true ? (null) : (
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Account number</Form.Label>
                                        <Form.Control type="text" placeholder="prepaid account or phone number" />
                                    </Form.Group>)}
    
                                {resquestSent === true ? (<Form.Group controlId="formBasicOTP">
                                    <Form.Label>OTP</Form.Label>
                                    <Form.Control type="text" placeholder="enter OTP" onChange={handelOTPChange} />
                                </Form.Group>) : (null)}
                                <MDBRow>
                                <MDBBtn color="warning" size="sm"onClick={hadndelBack}> Back to selection </MDBBtn>
                                    <MDBCol md="4"></MDBCol>
                                    {resquestSent === true ? (<MDBBtn color="primary" size="sm"onClick={handelSubmit}>Submit </MDBBtn>) 
                                    : (<MDBBtn color="primary" size="sm"onClick={handelRequest}>Get OTP </MDBBtn>) }
                                </MDBRow>
                            </Form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBContainer>
                        <MDBCard style={{ marginTop: "1rem" }}>
                            <MDBCardHeader color="primary-color" tag="h3">
                                Instruction
        </MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Pay with Amole</MDBCardTitle>
                                <MDBCardText>
                                    Money transfer (remittance) service is one of the main areas of operations carried out by the Bank. Remittances of funds through banks from one town to another at the request of customers are referred Domestic Money Transfer or Remittances. There are various modes of effecting Money Transfer. However, the most common means of remitting funds from one spot to the other within the country are:
    
                                    Mail Transfers
                                    Telegraphic or Telephone Transfers
                                    Local Drafts
                                    Cashier Payment Order (CPO)
                                    Money transfer (remittance) service is one of the main areas of operations carried out by the Bank
                                    . Remittances of funds through banks from one town to another at the request of customers are referred 
                                    Domestic Money Transfer or Remittances. There are various modes of effecting Money Transfer. However, 
                                    the most common means of 
                                    remitting funds from one spot to the other within the country are:
                                    Mail Transfers
                                    Telegraphic or Telephone Transfers
                                    Local Drafts
                                    Cashier Payment Order (CPO)
                                    Domestic Money Transfer or Remittances. There are various modes of effecting Money Transfer. However, 
                                    the most common means of 
                                    remitting funds from one spot to the other within the country are:
                                    Mail Transfers
                                    Telegraphic or Telephone Transfers
                                    Local Drafts
                                    Cashier Payment Order (CPO)
          </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            )
        )
        )
}

export default CardExample;