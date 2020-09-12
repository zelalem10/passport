import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardHeader, MDBContainer, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PayWithAmole from '../Payment/PayWithAmole'
import PayWithCBE from '../Payment/PayWithCBE'
import PayWithCBEBirr from '../Payment/PayWithCBEBirr'
import PayWithHibret from '../Payment/PayWithHibret'
import PayWithPSS from '../Payment/PayWithPSS'
import PayWithAbyssinia from '../Payment/PayWithAbyssinia'
import API from '../Utils/API'
import token from '../common/accessToken'


const CardExample = () => {
    const [selectedOption, setSelectedOption] = useState();
    const [optionSelected, setOptionSelected] = useState(false);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [pssContent, setPSSContent] = useState("")

    function getSelectedOption(optionName) {
        if (optionName == "Amole")
            return <PayWithAmole />;
        else if (optionName == "CBE")
            return <PayWithCBE />
        else if (optionName == "CBEBirr")
            return <PayWithCBEBirr />
        else if (optionName == "PSS")
            return <PayWithPSS content={pssContent} />
        else if (optionName == "Hibret")
            return <PayWithHibret />
        else if (optionName == "Abyssinia")
            return <PayWithAbyssinia />
        else
            return <h3>Unkown payment option</h3>;
    }
    useEffect(() => {
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
            channel: "PSS",
            paymentOptionsId: 6,
            traceNumbers: "",
            Status: 4,
            OrderId: "",
            otp: "",
            requestId: 3,
        };
        API.get("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/GetPaymentOptions", config)
            .then((todo) => setPaymentOptions(todo.data.paymentOptions))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => {
                setPSSContent(todo.data.redirectMSG)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
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
                    <MDBCard style={{ marginTop: "1rem" }}>
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
                                                <MDBCardTitle>{paymentOption.name}</MDBCardTitle>
                                                <MDBCardText></MDBCardText>
                                                {paymentOption.instruction}
                                            </MDBCardBody>
                                            <MDBBtn href="#" onClick={() => handelClick(paymentOption.code)}>Select</MDBBtn>
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