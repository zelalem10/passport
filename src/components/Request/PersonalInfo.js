import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { MDBRow, MDBCol, MDBFormInline, MDBInput, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
const PersonalInfo = forwardRef((props, ref) => {
    const classes = useStyles();

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        birthCountry: "",
        birthCity: "",
        birthDate: "",
        gender: "",
        height: "",
        eyeColor: "",
        hairColor: "",
        occupation: "",
        halfCast: "",
        enrolmentDate: "",
        nationality: "",
        dataSaved: false,
        formCompleted: false
    });
    const [notCompleted, setNotCompleted] = useState({
        firstName: true,
        middleName: true,
        lastName: true,
        birthCountry: true,
        birthCity: true,
        birthDate: true,
        gender: true,
        height: true,
        eyeColor: true,
        hairColor: true,
        occupation: true,
        halfCast: true,
        enrolmentDate: true,
        nationality: true
    });

    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    const isRequired = "is required!"
    if (counter.personalInfoReducer.length === 0) {
        dispatch(addPersonalInfo(personalInfo));
    }
    useImperativeHandle(ref, () => ({
        saveData() {
            setPersonalInfo((prevState) => ({
                ...prevState,
                dataSaved: true,
            }));
            dispatch(addPersonalInfo(personalInfo));
        },
        Validate() {
            setNotCompleted({
                firstName: personalInfo.firstName === "" ? true : false,
                middleName: personalInfo.middleName === "" ? true : false,
                lastName: personalInfo.lastName === "" ? true : false,
                birthCountry: personalInfo.birthCountry === "" ? true : false,
                birthCity: personalInfo.birthCity === "" ? true : false,
                birthDate: personalInfo.birthDate === "" ? true : false,
                gender: personalInfo.gender === "" ? true : false,
                height: personalInfo.height === "" ? true : false,
                eyeColor: personalInfo.eyeColor === "" ? true : false,
                hairColor: personalInfo.hairColor === "" ? true : false,
                occupation: personalInfo.occupation === "" ? true : false,
                halfCast: personalInfo.halfCast === "" ? true : false,
                enrolmentDate: personalInfo.enrolmentDate === "" ? true : false,
                nationality: personalInfo.nationality === "" ? true : false
            })
            if (notCompleted.firstName == true || notCompleted.lastName || notCompleted.middleName == true  || notCompleted.birthDate == true
                // || notCompleted.birthCountry == true || notCompleted.birthCity == true || notCompleted.height == true
                // || notCompleted.eyeColor == true || notCompleted.hairColor == true || notCompleted.gender == true
                // || notCompleted.occupation == true || notCompleted.halfCast == true || notCompleted.nationality == true || notCompleted.enrolmentDate == true
                )
                return false;
            else
                return true
        }
    }));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        if (value != "") {
            setNotCompleted((prevState) => ({
                ...prevState,
                [name]: false,
            }))
        }
        dispatch(addPersonalInfo(personalInfo));
    }

    var prevInfo = counter.personalInfoReducer[counter.personalInfoReducer.length - 1]
    useEffect(() => {
        setPersonalInfo((prevState) => ({
            ...prevState,
            firstName: prevInfo ? prevInfo.firstName : "",
            middleName: prevInfo ? prevInfo.middleName : "",
            lastName: prevInfo ? prevInfo.lastName : "",
            birthCountry: prevInfo ? prevInfo.birthCountry : "",
            birthCity: prevInfo ? prevInfo.birthCity : "",
            birthDate: prevInfo ? prevInfo.birthDate : "",
            height: prevInfo ? prevInfo.height : "",
            gender: prevInfo ? prevInfo.gender : "",
            eyeColor: prevInfo ? prevInfo.eyeColor : "",
            hairColor: prevInfo ? prevInfo.hairColor : "",
            occupation: prevInfo ? prevInfo.occupation : "",
            halfCast: prevInfo ? prevInfo.halfCast : "",
            enrolmentDate: prevInfo ? prevInfo.enrolmentDate : "",
            nationality: prevInfo ? prevInfo.nationality : "",
            formCompleted: prevInfo ? prevInfo.formCompleted : false,
        }))
    }, []);
    return (
        <Card style={{ marginBottom: "1rem" }}>
            <Card.Body>
                    <form>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.firstName : null}
                                    name="firstName"
                                    className="form-control"
                                    onBlur={handleChange}
                                    type="text"
                                    label="First name"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.firstName == true && personalInfo.dataSaved == true) ? "First name " + isRequired : null}</span>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.middleName : null}
                                    name="middleName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="Middle name"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.middleName == true && personalInfo.dataSaved == true) ? "Middle name " + isRequired : null}</span>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.lastName : null}
                                    name="lastName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="Last name"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.lastName == true && personalInfo.dataSaved == true) ? "Last name " + isRequired : null}</span>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthDate : null}
                                    name="birthDate"
                                    onChange={handleChange}
                                    type="date"
                                    label="Birth Date"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.birthDate == true && personalInfo.dataSaved == true) ? "Birth date " + isRequired : null}</span>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthCountry : null}
                                    name="birthCountry"
                                    className="form-control"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth Country"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthCity : null}
                                    name="birthCity"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth City"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.nationality : null}
                                    name="nationality"
                                    onChange={handleChange}
                                    type="text"
                                    label="Nationality"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.enrolmentDate : null}
                                    name="enrolmentDate"
                                    onChange={handleChange}
                                    type="date"
                                    label="Enrolment date"
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.occupation : null}
                                    name="occupation"
                                    className="form-control"
                                    onChange={handleChange}
                                    type="text"
                                    label="Occupation"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.height : null}
                                    name="height"
                                    onChange={handleChange}
                                    type="text"
                                    label="Height"
                                />
                            </MDBCol>
                            <MDBCol>
                            <MDBInput
                                    valueDefault={prevInfo ? prevInfo.halfCast : null}
                                    name="halfCast"
                                    onChange={handleChange}
                                    type="text"
                                    label="Half Cast"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.eyeColor : null}
                                    name="eyeColor"
                                    onChange={handleChange}
                                    type="text"
                                    label="Eye Color"
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.hairColor : null}
                                    name="hairColor"
                                    className="form-control"
                                    onChange={handleChange}
                                    type="text"
                                    label="Hair Color"
                                />
                            </MDBCol>
                            <MDBCol>
                                <label>Gender</label>
                                <select className="browser-default custom-select">
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </MDBCol>
                            <MDBCol></MDBCol>
                            <MDBCol></MDBCol>
                        </MDBRow>
                    </form>
            </Card.Body>
        </Card>
    );
});
export default PersonalInfo