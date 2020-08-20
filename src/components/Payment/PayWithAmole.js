import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import PaymentSelection from '../Payment/PaymentSelection'


const CardExample = () => {
    const [resquestSent, setResquestSent] = useState(false);
    const [returnBack, setReturnBack] = useState(false)
    function hadndelBack() {
        setReturnBack(true)
    }
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
                                <Button variant="warning" type="button" onClick={hadndelBack}> Back to selection </Button>
                                <MDBCol md="4"></MDBCol>
                                <Button variant="primary" type="submit"> Get OTP </Button>

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
                            <MDBCardTitle>LOCAL MONEY / WIRE TRANSFER</MDBCardTitle>
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