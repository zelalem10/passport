import React, { useState,useEffect } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader,MDBNavLink, MDBCardBody, MDBLink, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PaymentSelection from '../Payment/PaymentSelection'
import API from '../Utils/API'
import JsxParser from 'react-jsx-parser'




const PayWithPSS = () => {
    const [redirectLink, setRedirectLink] = useState("");
    const [returnBack, setReturnBack] = useState(false)
    function hadndelBack() {
        setReturnBack(true)
    }
   
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTkxMTQwMDMsImV4cCI6MTU5OTEyODQwMywiaWF0IjoxNTk5MTE0MDAzfQ.-fjjDr4Z71dqz3ss_NyVu05lnwl5nT025VwmckOVpHE` }
        };
        const body = {
            firstName: 'atalay',
            lastName: 'Tilahun',
            phone:"0932876051",
            amount:10,
            currency:"ETB",
            city:"Addis Ababa",
            country:"Ethiopia",
            channel:"PSS",
            paymentOptionsId:6,
            traceNumbers:"",
            expireyDate:"2020-11-21T07:56:10.877Z",
            otp:"",
          };
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => 
            {
                setRedirectLink(todo.data.redirectMSG)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
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
                            <MDBCardTitle>Pay with PSS</MDBCardTitle>
                            <MDBCardText>{redirectLink}</MDBCardText>
                            <MDBBtn color="warning" size="sm"onClick={hadndelBack}> Back to selection </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </MDBCol>
        </MDBRow>)

    )
}

export default PayWithPSS;