import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBNavLink, MDBCardBody, MDBLink, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PaymentSelection from '../Payment/PaymentSelection'
import API from '../Utils/API'
import JsxParser from 'react-jsx-parser'

const PayWithPSS = (props) => {
    const [redirectLink, setRedirectLink] = useState("");
    const [returnBack, setReturnBack] = useState(false)
    function hadndelBack() {
        setReturnBack(true)
    }
    useEffect(() => {
        console.log(props.content)
    }, [])
    return (
        returnBack === true ? (<PaymentSelection />) : (
            <MDBContainer>
                <MDBCardBody>
                     <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
                    <MDBBtn color="warning" size="sm" onClick={hadndelBack}> Back to selection </MDBBtn>
                </MDBCardBody>
            </MDBContainer>)

    )
}

export default PayWithPSS;