import React, { useEffect, useState } from 'react'
import { MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';
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
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';
import { useForm } from "react-hook-form";


const config = {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk3MjEzNTU5LCJleHAiOjE1OTcyMjc5NTksImlhdCI6MTU5NzIxMzU1OX0.IJihXj3WJQEsNjFjYIL8-Z2LmtKvT250dl04L8YmIIw` }
};

export default function PersonalInfo() {

    const [personalInfo, setPersonalInfo] = useState({
        firstName:"",
        middleName:"",
        lastName:"",
        birthCountry:"",
        birthCity:"",
        birthDate:"",
        gender:"",
        height:"",
        eyeColor:"",
        hairColor:"",
        communicationMethod:"",
        occupation:"",
        halfCast:"",
        enrolmentDate:"",
        nationality:"",
        dataSaved:false
    });
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    if(counter.personalInfoReducer.length===0){
        dispatch(addPersonalInfo({personalInfo}));
    }
    var prevInfo=personalInfo
    const handleSave = (event) => {
        setPersonalInfo((prevState) =>({
            ...prevState,
            dataSaved: true,
            }));
        dispatch(addPersonalInfo({personalInfo}));
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPersonalInfo((prevState) =>({
             ...prevState,
              [name]: value,
             }))
    }
    console.log(prevInfo);
    return (
        <Card style={{marginBottom: "1rem" }}>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <form>
                        <MDBRow>
                            <MDBCol md="4">
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="firstName" value={prevInfo.firstName} onChange={handleChange} placeholder="First Name" />
                                    </Form.Group>
                                    <Form.Group controlId="dateOfBirth">
                                        <Form.Label>Date of birth<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="Date" name="birthDate"  value={prevInfo.birthDate} onChange={handleChange}  placeholder="date of birth" />
                                    </Form.Group>
                                    <Form.Group controlId="height">
                                        <Form.Label>Height<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="height"  value={prevInfo.height} onChange={handleChange} placeholder="Height" />
                                    </Form.Group>
                                    <Form.Group controlId="occupation">
                                        <Form.Label>Occupation<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="occupation"  value={prevInfo.occupation}  onChange={handleChange} placeholder="Occupation" />
                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="lastName"  value={prevInfo.lastName} onChange={handleChange} placeholder="Last Name" />
                                    </Form.Group>
                            </MDBCol>
                            <MDBCol md="4">
                                    <Form.Group controlId="middleName">
                                        <Form.Label>Middle Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="middleName"  value={prevInfo.middleName}  onChange={handleChange} placeholder="Middle Name" />
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
                                        <Form.Control type="text" name="eyeColor"  value={prevInfo.eyeColor} onChange={handleChange} placeholder="Eye Color" />
                                    </Form.Group>
                                    <Form.Group controlId="halfCast">
                                        <Form.Label>Half Cast<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="halfCast"  value={prevInfo.halfCast} onChange={handleChange} placeholder="Half Cast" />
                                    </Form.Group>
                                    <Form.Group controlId="nationality">
                                        <Form.Label>Nationality<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="nationality"  value={prevInfo.nationality} onChange={handleChange} placeholder="Nationality" />
                                    </Form.Group>
                            </MDBCol>
                            <MDBCol md="4">
                                <Form.Group controlId="birthCountry">
                                    <Form.Label>Birth Country<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" name="birthCountry"  value={prevInfo.birthCountry} onChange={handleChange} placeholder="Birth Country" />
                                </Form.Group>
                                <Form.Group controlId="birthCity">
                                    <Form.Label>Birth City<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" name="birthCity"  value={prevInfo.birthCity} onChange={handleChange} placeholder="Birth City" />
                                </Form.Group>

                                <Form.Label>Comm. Method<i style={{ color: "red" }}>*</i> </Form.Label>
                                <Form.Control name="communicationMethod"  value={prevInfo.communicationMethod} onChange={handleChange} as="select">
                                    <option value="both">Both</option>
                                    <option value="sms">SMS</option>
                                    <option value="email">Email</option>
                                </Form.Control>
                                <Form.Group controlId="enrolmentDate">
                                    <Form.Label>Enrolment Date<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="Date" name="enrolmentDate"  value={prevInfo.enrolmentDate} onChange={handleChange} placeholder="Enrolment Date" />
                                </Form.Group>
                                <Form.Group controlId="hairColor">
                                    <Form.Label>Hair Color<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" name="hairColor"  value={prevInfo.hairColor} onChange={handleChange} placeholder="Hair Color" />
                                </Form.Group>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="5"></MDBCol>
                            <MDBBtn color="dark-green" onClick={handleSave}>Save</MDBBtn>
                        </MDBRow>
                    </form>
                </blockquote>
            </Card.Body>
        </Card>

    );
}
