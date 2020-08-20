import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';

const CardExample = () => {
    return (
        <MDBRow>
            <MDBCol md="3"></MDBCol>
            <MDBCol style={{ maxWidth: "30rem" }}>
                <MDBCard>
                    <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                        waves />
                    <MDBCardBody>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Amount(ETB)</Form.Label>
                                <Form.Control type="text" disabled value="1000" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Account number</Form.Label>
                                <Form.Control type="text" placeholder="Account number" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Get OTP
  </Button>
                        </Form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>

    )
}

export default CardExample;