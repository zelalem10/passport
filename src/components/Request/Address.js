
import React, { useEffect, useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import { Form, Card, Row, Col, InputGroup, Button } from 'react-bootstrap';


export default function Address() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Card>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="validationCustom02">
                                <Form.Label>Country<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Country"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom03">
                                <Form.Label>City<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="text" placeholder="City" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>State<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="text" placeholder="State" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>Zone<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="text" placeholder="Zone" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                <Form.Label>Wereda<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Woreda"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom03">
                                <Form.Label>Street<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="text" placeholder="Street" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>HouseNo<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="text" placeholder="HouseNo" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>PoBox<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="text" placeholder="PoBox" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                <Form.Label>Phone Number<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="PhoneNumber"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom03">
                                <Form.Label>Email<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="email" placeholder="Email" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>Request Place<i style={{ color: "red" }}>*</i></Form.Label>
                                <Form.Control type="text" placeholder="Request Place" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </blockquote>
            </Card.Body>
        </Card>
    );
}