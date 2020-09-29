import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBNavLink, MDBCardBody, MDBLink, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PaymentSelection from '../Payment/PaymentSelection'
import API from '../Utils/API'
import axios from "axios";
const queryString = require('query-string')
// var parse = require('html-react-parser');


const PayWithPSS = () => {
    const [contentResponse, setContentResponse] = useState("");
    const [returnBack, setReturnBack] = useState(false)
    const [responseGot, setResponseGot] = useState(false)

    function hadndelBack() {
        setReturnBack(true)
    }
    const accesstoken = localStorage.systemToken;
    const config = {
        headers: { Authorization: "Bearer "+ accesstoken }
    };
    const markup=()=>{
        return {__html: contentResponse}
    }
    useEffect(() => {
        const body = {
            firstName: 'Atalay',
            lastName: 'Tilahun',
            email: 'atehun@gmail.com',
            phone: "0932876051",
            amount: 600,
            currency: "ETB",
            city: "Addis Ababa",
            country: "Ethiopia",
            channel: "PSS",
            paymentOptionsId: 6,
            traceNumbers: "",
            Status: 4,
            OrderId: "",
            otp: "",
            requestId: 7465,
        };
        const directBody= {
            "transactionAmount": 300,
            "pspId": "PSP_001",
            "mpiId": "mpi-test",
            "merchantId": "000030010400090",
            "mcc": "7011",
            "merchantKitId": "mki-test",
            "authenticationToken": "ABA50477AF5266E2E053CF01010A0914",
            "currency": "ETB",
            "transactionReference": "EP123456",
            "cardHolderPhoneNumber": "+251911085780",
            "cardHolderMailAddress": "esayasgizaw@gmail.com",
            "cardHolderIPAddress": "196.12.213.90",
            "countryCode": "ET",
            "cardAcceptor": "000030010400090",
            "language": "en",
            "callBackUrl": "https://ethiopianpaymentgetawayservices.azurewebsites.net/PSS/api/V1.0/PSS/CallBackUrl",
            "redirectBackUrl": "https://ethiopianpaymentgetawayservices.azurewebsites.net/PSS/api/V1.0/PSS/RedirectUrl",
        };
        const directConfig = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        };
        
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => {
                setContentResponse(todo.data.redirectMSG);
                setResponseGot(true);
                console.log("MSG: ", todo.data.redirectMSG);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
    }, []);
    return (
        returnBack === true ? (<PaymentSelection />) :
         (responseGot===true?(<div dangerouslySetInnerHTML={ markup() } />):(null))
    )
}

export default PayWithPSS;