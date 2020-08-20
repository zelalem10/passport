import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import PayWithAmole from '../Payment/PayWithAmole'
function getSelectedOption(optionName) {
    switch (optionName) {
        case "amole":
            return <PayWithAmole />;
        default:
            return 'Unknown stepIndex';
    }
}

const CardExample = () => {
    const [selectedOption, setSelectedOption] = useState();
    const [optionSelected, setOptionSelected] = useState(false);


    const handelClick = () => {
        setSelectedOption("amole");
        setOptionSelected(true)
    }
    return (
        optionSelected === false ?
            (<MDBRow>
                <MDBCol style={{ maxWidth: "22rem" }}>
                    <MDBCard>
                        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                            waves />
                        <MDBCardBody>
                            <MDBCardTitle>Amole</MDBCardTitle>
                            <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                            <MDBBtn href="#" onClick={handelClick}>Select</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol style={{ maxWidth: "22rem" }}>
                    <MDBCard>
                        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                            waves />
                        <MDBCardBody>
                            <MDBCardTitle>United bank</MDBCardTitle>
                            <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                            <MDBBtn href="#">Select</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol style={{ maxWidth: "22rem" }}>
                    <MDBCard>
                        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                            waves />
                        <MDBCardBody>
                            <MDBCardTitle>CBE birr</MDBCardTitle>
                            <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                            <MDBBtn href="#"> Select</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>) : (
                <div>{getSelectedOption(selectedOption)}</div>
            )
    )
}

export default CardExample;