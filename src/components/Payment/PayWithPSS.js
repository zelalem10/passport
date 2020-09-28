import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBCardHeader, MDBNavLink, MDBCardBody, MDBLink, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PaymentSelection from '../Payment/PaymentSelection'
import API from '../Utils/API'
import { BsLayoutTextWindowReverse } from 'react-icons/bs';
// var parse = require('html-react-parser');


const PayWithPSS = () => {
    const [contentResponse, setContentResponse] = useState("");
    const [returnBack, setReturnBack] = useState(false)
    function hadndelBack() {
        setReturnBack(true)
    }
    const accesstoken = localStorage.systemToken;
    const config = {
        headers: { Authorization: "Bearer "+ accesstoken }
    };
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
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => {
                debugger;
                setContentResponse(todo.data.redirectMSG)
    
                console.log("MSG: ", todo.data.redirectMSG);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
    }, [])
    return (
        returnBack === true ? (<PaymentSelection />) :
         (<div dangerouslySetInnerHTML={{__html: contentResponse}} />)
    )
}

export default PayWithPSS;