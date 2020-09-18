import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard,MDBCardHeader, MDBContainer, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PayWithAmole from '../Payment/PayWithAmole'
import PayWithCBE from '../Payment/PayWithCBE'
import PayWithCBEBirr from '../Payment/PayWithCBEBirr'
import PayWithHibret from '../Payment/PayWithHibret'
import PayWithPSS from '../Payment/PayWithPSS'
import PayWithAbyssinia from '../Payment/PayWithAbyssinia'

import API from '../Utils/API'
function getSelectedOption(optionName) {
    switch (optionName) {
        case "Amole":
            return <PayWithAmole />;
        case "CBE":
            return <PayWithCBE />
        case "CBEBirr":
            return <PayWithCBEBirr />
        case "PSS":
            return <PayWithPSS />
        case "Hibret":
            return <PayWithHibret />
        case "Abyssinia":
            return <PayWithAbyssinia />
        default:
            return <h3>Unkown payment option</h3>;
    }
}
const CardExample = () => {
    const [selectedOption, setSelectedOption] = useState();
    const [optionSelected, setOptionSelected] = useState(false);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTkyMTg5NTQsImV4cCI6MTU5OTIzMzM1NCwiaWF0IjoxNTk5MjE4OTU0fQ.XK2Y4z8ogsP7JK1ZKnetby59h-nBfeucciIbai6Ej6c` }
    };
    useEffect(() => {
        API.get("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/GetPaymentOptions", config)
            .then((todo) => setPaymentOptions(todo.data.paymentOptions))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }, [])
    const handelClick = (optionCode) => {
        setSelectedOption(optionCode);
        setOptionSelected(true)
    }
    return (
        optionSelected === false ?
            (
                <MDBContainer>
                    <MDBCard style={{marginTop: "1rem" }}>
                        <MDBCardHeader color="primary-color" tag="h3">
                            Select payment option to pay
                  </MDBCardHeader>
                        <MDBCardBody>
                            <MDBRow>
                                {paymentOptions.map((paymentOption) =>
                                    <MDBCol md="4" style={{ marginBottom: "5px" }}>
                                        <MDBCard>
                                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                                waves />
                                            <MDBCardBody>
                                                <MDBCardTitle>{paymentOption.name}</MDBCardTitle>instruction
                                             <MDBCardText></MDBCardText>
                                                <MDBBtn href="#" onClick={() => handelClick(paymentOption.code)}>Select</MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                )
                                }
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            ) : (
                <div>{getSelectedOption(selectedOption)}</div>
            )
    )
}

export default CardExample;