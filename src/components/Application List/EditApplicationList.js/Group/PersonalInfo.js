import React, { useEffect, useState, useImperativeHandle,forwardRef } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import addGroupPersonalInfo from '../../redux/actions/GroupRequest/addGroupPersonalInfoAction';


const config = {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk3MjEzNTU5LCJleHAiOjE1OTcyMjc5NTksImlhdCI6MTU5NzIxMzU1OX0.IJihXj3WJQEsNjFjYIL8-Z2LmtKvT250dl04L8YmIIw` }
};

const PersonalInfo = forwardRef((props, ref) => {
    const [personalInfo, setPersonalInfo] = useState({
        applicantNumber:props.applicantNumber,
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
    const personRef = React.useRef();
    
      useImperativeHandle(ref, () => ({
        saveData() {
          setPersonalInfo((prevState) =>({
            ...prevState,
            dataSaved: true,
            }));
        dispatch(addGroupPersonalInfo({personalInfo}));
        },
        Validate() {
            //console.log(counter.groupPersonalInfo)
        }
      }));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPersonalInfo((prevState) =>({
             ...prevState,
              [name]: value,
             }))
        //dispatch(addGroupPersonalInfo(personalInfo));

    }
    var prevInfo=counter.groupPersonalInfo[counter.groupPersonalInfo.length - 1]
       
    useEffect(() => {
        if(counter.groupPersonalInfo.length===0){
            dispatch(addGroupPersonalInfo({personalInfo}));
        } 
            setPersonalInfo((prevState) =>({
                ...prevState,
                 firstName: prevInfo? prevInfo.firstName:null,
                 middleName: prevInfo? prevInfo.middleName:null,
                 lastName: prevInfo? prevInfo.lastName:null,
                 birthCountry: prevInfo? prevInfo.birthCountry:null,
                 birthCity: prevInfo? prevInfo.birthCity:null,
                 birthDate: prevInfo? prevInfo.birthDate:null,
                 height: prevInfo? prevInfo.height:null,
                 gender: prevInfo? prevInfo.gender:null,
                 eyeColor: prevInfo? prevInfo.eyeColor:null,
                 hairColor: prevInfo? prevInfo.hairColor:null,
                 communicationMethod: prevInfo? prevInfo.communicationMethod:null,
                 occupation: prevInfo? prevInfo.occupation:null,
                 halfCast: prevInfo? prevInfo.halfCast:null,
                 enrolmentDate: prevInfo? prevInfo.enrolmentDate:null,
                 nationality: prevInfo? prevInfo.nationality:null,
                 dataSaved: prevInfo? prevInfo.dataSaved:null,
                }))
        }, []);
    return (
        <Card style={{marginBottom: "1rem" }}>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <form>
                        <MDBRow>
                            <MDBCol md="4">
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="firstName" defaultValue={prevInfo? prevInfo.firstName:null} onChange={handleChange} placeholder="First Name" />
                                    </Form.Group>
                                    <Form.Group controlId="dateOfBirth">
                                        <Form.Label>Date of birth<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="Date" name="birthDate"  defaultValue={prevInfo? prevInfo.birthDate: null} onChange={handleChange}  placeholder="date of birth" />
                                    </Form.Group>
                                    <Form.Group controlId="height">
                                        <Form.Label>Height<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="height"  defaultValue={prevInfo? prevInfo.height: null} onChange={handleChange} placeholder="Height" />
                                    </Form.Group>
                                    <Form.Group controlId="occupation">
                                        <Form.Label>Occupation<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="occupation"  defaultValue={prevInfo? prevInfo.occupation: null}  onChange={handleChange} placeholder="Occupation" />
                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="lastName"  defaultValue={prevInfo? prevInfo.lastName: null} onChange={handleChange} placeholder="Last Name" />
                                    </Form.Group>
                            </MDBCol>
                            <MDBCol md="4">
                                    <Form.Group controlId="middleName">
                                        <Form.Label>Middle Name<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="middleName"  defaultValue={prevInfo? prevInfo.middleName: null}  onChange={handleChange} placeholder="Middle Name" />
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
                                        <Form.Control type="text" name="eyeColor"  defaultValue={prevInfo? prevInfo.eyeColor: null} onChange={handleChange} placeholder="Eye Color" />
                                    </Form.Group>
                                    <Form.Group controlId="halfCast">
                                        <Form.Label>Half Cast<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="halfCast"  defaultValue={prevInfo? prevInfo.halfCast: null} onChange={handleChange} placeholder="Half Cast" />
                                    </Form.Group>
                                    <Form.Group controlId="nationality">
                                        <Form.Label>Nationality<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="nationality"  defaultValue={prevInfo? prevInfo.nationality: null} onChange={handleChange} placeholder="Nationality" />
                                    </Form.Group>
                            </MDBCol>
                            <MDBCol md="4">
                                <Form.Group controlId="birthCountry">
                                    <Form.Label>Birth Country<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" name="birthCountry"  defaultValue={prevInfo? prevInfo.birthCountry: null} onChange={handleChange} placeholder="Birth Country" />
                                </Form.Group>
                                <Form.Group controlId="birthCity">
                                    <Form.Label>Birth City<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" name="birthCity"  defaultValue={prevInfo? prevInfo.birthCity: null} onChange={handleChange} placeholder="Birth City" />
                                </Form.Group>

                                <Form.Label>Comm. Method<i style={{ color: "red" }}>*</i> </Form.Label>
                                <Form.Control name="communicationMethod"  defaultValue={prevInfo? prevInfo.communicationMethod: null} onChange={handleChange} as="select">
                                    <option value="both">Both</option>
                                    <option value="sms">SMS</option>
                                    <option value="email">Email</option>
                                </Form.Control>
                                <Form.Group controlId="enrolmentDate">
                                    <Form.Label>Enrolment Date<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="Date" name="enrolmentDate"  defaultValue={prevInfo? prevInfo.enrolmentDate: null} onChange={handleChange} placeholder="Enrolment Date" />
                                </Form.Group>
                                <Form.Group controlId="hairColor">
                                    <Form.Label>Hair Color<i style={{ color: "red" }}>*</i></Form.Label>
                                    <Form.Control type="text" name="hairColor"  defaultValue={prevInfo? prevInfo.hairColor: null} onChange={handleChange} placeholder="Hair Color" />
                                </Form.Group>
                            </MDBCol>
                        </MDBRow>
                        {/* <MDBRow>
                            <MDBCol md="5"></MDBCol>
                            <MDBBtn color="success" onClick={handleSave}>Save</MDBBtn>
                        </MDBRow> */}
                    </form>
                </blockquote>
            </Card.Body>
        </Card>
    );
});
export default PersonalInfo