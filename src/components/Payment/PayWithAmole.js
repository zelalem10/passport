import React, { useState,useEffect } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import PaymentSelection from '../Payment/PaymentSelection'
import API from '../Utils/API'


const CardExample = () => {
    const [resquestSent, setResquestSent] = useState(false);
    const [returnBack, setReturnBack] = useState(false)
    function hadndelBack() {
        setReturnBack(true)
    }
    function handelRequest(){
        setResquestSent(true)
    }
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk4NjI0MjgwLCJleHAiOjE1OTg2Mzg2ODAsImlhdCI6MTU5ODYyNDI4MH0.ElxSHh-MPb6dDk68EtfOK7AqGn47K8mhjAdajZ2ni2M` }
        };
        const body = {
            firstName: 'atalay',
            lastName: 'Tilahun',
            phone:"0932876051",
            amount:10,
            currency:"ETB",
            city:"Addis Ababa",
            country:"Ethiopia",
            channel:"amole",
            paymentOptionsId:1,
            selectedPaymentOption:"amole",
            traceNumbers:"",
            expireyDate:"",
            otp:"",
          };
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => console.log(todo.data))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }, [])
    return (
        returnBack === true ? (<PaymentSelection />) : (<MDBRow>
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
                                <Form.Control type="text" placeholder="enter OTP" />
                            </Form.Group>) : (null)}
                            <MDBRow>
                            <MDBBtn color="warning" size="sm"onClick={hadndelBack}> Back to selection </MDBBtn>
                                <MDBCol md="4"></MDBCol>
                                <MDBBtn color="primary" size="sm"onClick={handelRequest}> {resquestSent === true ? "Submit" : "Get OTP"} </MDBBtn>

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
        </MDBRow>)

    )
}

export default CardExample;