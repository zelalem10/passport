import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import PaymentSelection from '../Payment/PaymentSelection'


const PayWithAbyssinia = () => {
    const [resquestSent, setResquestSent] = useState(false);
    const [returnBack, setReturnBack] = useState(false)
    function hadndelBack() {
        setReturnBack(true)
    }
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
                            <MDBCardTitle>Pay with Abysinia</MDBCardTitle>
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
                            <MDBBtn color="warning" size="sm"onClick={hadndelBack}> Back to selection </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </MDBCol>
        </MDBRow>)

    )
}

export default PayWithAbyssinia;