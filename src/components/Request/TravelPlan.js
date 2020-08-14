
import React, { useEffect, useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
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
                            
                        <Form.Group  as={Col} md="4" controlId="date">
                                        <Form.Label>Travel Date<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                    <Form.Group  as={Col} md="4" controlId="ticketNumber">
                                        <Form.Label>Ticket Number<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                        </Form.Row>
                    </Form>
                </blockquote>
            </Card.Body>
        </Card>
    );
}