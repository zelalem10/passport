import React, { useEffect, useState } from 'react'
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Card, Row } from 'react-bootstrap';
import API from '../Utils/API'
import { red } from '@material-ui/core/colors';

const config = {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk3MjEzNTU5LCJleHAiOjE1OTcyMjc5NTksImlhdCI6MTU5NzIxMzU1OX0.IJihXj3WJQEsNjFjYIL8-Z2LmtKvT250dl04L8YmIIw` }
};

export default function PersonalInfo() {
    const [communicationMethodList, setCmmunicationMethodList] = useState([]);
    const handleCommunicationChange = (event) => {
        console.log("test")
    }
    useEffect(() => {
        const body =
        {
            username: "atalay",
            password: "Atie@1234"
        }
        API.get("http://svdrbas03:2222/Master/api/V1.0/Region/GetAll", config)
            .then((todo) => setCmmunicationMethodList(todo.data.regionSer))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }, [])
    return (
        <Card>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <form>
                        <MDBRow>
                            <MDBCol md="4">
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="First Name" />
                                    </Form.Group>
                                    <Form.Group controlId="dateOfBirth">
                                        <Form.Label>Date of birth<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="Date" placeholder="date of birth" />
                                    </Form.Group>
                                    <Form.Group controlId="height">
                                        <Form.Label>Height<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="Height" />
                                    </Form.Group>
                                    <Form.Group controlId="occupation">
                                        <Form.Label>Occupation<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="Occupation" />
                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="Last Name" />
                                    </Form.Group>
                            </MDBCol>
                            <MDBCol md="4">
                                    <Form.Group controlId="middleName">
                                        <Form.Label>Middle Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="Middle Name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Gender<i style={{ color: "red" }}>*</i>
                                        </Form.Label>
                                        <Row>
                                            <Form.Check
                                                type="radio"
                                                label="Male"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Female"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios2"
                                            />
                                        </Row>
                                    </Form.Group>
                                    <Form.Group controlId="eyeColor">
                                        <Form.Label>Eye Color<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="Eye Color" />
                                    </Form.Group>
                                    <Form.Group controlId="halfCast">
                                        <Form.Label>Half Cast<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="Half Cast" />
                                    </Form.Group>
                                    <Form.Group controlId="nationality">
                                        <Form.Label>Nationality<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" placeholder="Nationality" />
                                    </Form.Group>
                            </MDBCol>
                            <MDBCol md="4">
                                <Form.Group controlId="birthCountry">
                                    <Form.Label>Birth Country<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" placeholder="Birth Country" />
                                </Form.Group>
                                <Form.Group controlId="birthCity">
                                    <Form.Label>Birth City<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" placeholder="Birth City" />
                                </Form.Group>

                                <Form.Label>Comm. Method<i style={{ color: "red" }}>*</i> </Form.Label>
                                <Form.Control option={communicationMethodList} onChange={handleCommunicationChange} as="select">
                                    {communicationMethodList.map((method) =>
                                        <option value={method.id}>{method.name}</option>
                                    )
                                    }
                                </Form.Control>
                                <Form.Group controlId="enrolmentDate">
                                    <Form.Label>Enrolment Date<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="Date" placeholder="Enrolment Date" />
                                </Form.Group>
                                <Form.Group controlId="hairColor">
                                    <Form.Label>Hair Color<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" placeholder="Hair Color" />
                                </Form.Group>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </blockquote>
            </Card.Body>
        </Card>

    );
}
