import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBContainer } from 'mdbreact';
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
import addPersonalInfo from '../../../../redux/actions/addPersonalInfoAction';

import updatePersonalInfo from '../../../../redux/actions/updatePersonalInfoAction';
import { object } from 'prop-types';

const PersonalInfo = forwardRef((props, ref) => {
  const { applicants } = props;
  const [personalInfo, setPersonalInfo] = useState([]);

  let applicantInfo = [];
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  if (counter.personalInfoReducer.length === 0) {
    for (let i = 0; i < applicants.length; i++) {
      applicantInfo.push({
        id: applicants[i].id,
        firstName: applicants[i].firstName,
        middleName: applicants[i].middleName,
        lastName: applicants[i].lastName,
        birthCountry: applicants[i].birthCountry,
        birthCity: applicants[i].birthCity,
        birthDate: applicants[i].dateOfBirth,
        gender: applicants[i].gender,
        height: applicants[i].height,
        eyeColor: applicants[i].eyeColor,
        hairColor: applicants[i].hairColor,
        occupation: applicants[i].occupation,
        halfCast: applicants[i].halfCast,
        enrolmentDate: applicants[i].enrolmentDate,
        nationality: applicants[i].nationality,
        formCompleted: true,
      });
    }
    setPersonalInfo(applicantInfo);
    dispatch(addPersonalInfo(applicantInfo));
  }
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
    nationality: true,
  });

  const isRequired = 'is required!';
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
        firstName: personalInfo.firstName === '' ? true : false,
        middleName: personalInfo.middleName === '' ? true : false,
        lastName: personalInfo.lastName === '' ? true : false,
        birthCountry: personalInfo.birthCountry === '' ? true : false,
        birthCity: personalInfo.birthCity === '' ? true : false,
        birthDate: personalInfo.birthDate === '' ? true : false,
        gender: personalInfo.gender === '' ? true : false,
        height: personalInfo.height === '' ? true : false,
        eyeColor: personalInfo.eyeColor === '' ? true : false,
        hairColor: personalInfo.hairColor === '' ? true : false,
        occupation: personalInfo.occupation === '' ? true : false,
        halfCast: personalInfo.halfCast === '' ? true : false,
        enrolmentDate: personalInfo.enrolmentDate === '' ? true : false,
        nationality: personalInfo.nationality === '' ? true : false,
      });
      if (
        notCompleted.firstName == true ||
        notCompleted.lastName ||
        notCompleted.middleName == true ||
        notCompleted.birthCountry == true ||
        notCompleted.birthCity == true ||
        notCompleted.birthDate == true ||
        notCompleted.height == true ||
        notCompleted.eyeColor == true ||
        notCompleted.hairColor == true ||
        notCompleted.gender == true ||
        notCompleted.occupation == true ||
        notCompleted.halfCast == true ||
        notCompleted.nationality == true ||
        notCompleted.enrolmentDate == true
      )
        return false;
      else return true;
    },
  }));

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   let personalData =
  //     counter.personalInfoReducer[counter.personalInfoReducer.length - 1];

  //   for (let person in personalData) {
  //     if (personalData[person].id === props.applicantNumber) {
  //       personalData[person][name] = value;
  //       // dispatch(updatePersonalInfo(personalData[person]));
  //     }
  //   }
  //   setPersonalInfo(personalData);
  //   if (value != '') {
  //     setNotCompleted((prevState) => ({
  //       ...prevState,
  //       [name]: false,
  //     }));
  //   }
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value != '') {
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
  };
  // Get the size of an object

  let prevInfo;
  if (counter.personalInfoReducer.length !== 0) {
    const resultLength = counter.personalInfoReducer.filter(
      (item) => item.id == props.applicantNumber
    ).length;

    const applicantInformation =
      counter.personalInfoReducer[counter.personalInfoReducer.length - 1];
    var size = applicantInformation.hasOwnProperty('firstName');
    if (size) {
      prevInfo = counter.personalInfoReducer.filter(
        (item) => item.id == props.applicantNumber
      )[resultLength - 1];
    } else {
      for (let applicant in applicantInformation) {
        if (applicantInformation[applicant].id == props.applicantNumber) {
          prevInfo = applicantInformation[applicant];
        }
      }
    }
  }
  useEffect(() => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      id: prevInfo ? prevInfo.id : null,
      firstName: prevInfo ? prevInfo.firstName : null,
      middleName: prevInfo ? prevInfo.middleName : null,
      lastName: prevInfo ? prevInfo.lastName : null,
      birthCountry: prevInfo ? prevInfo.birthCountry : null,
      birthCity: prevInfo ? prevInfo.birthCity : null,
      birthDate: prevInfo ? new Date(prevInfo.birthDate) : null,
      height: prevInfo ? prevInfo.height : null,
      gender: prevInfo ? prevInfo.gender : null,
      eyeColor: prevInfo ? prevInfo.eyeColor : null,
      hairColor: prevInfo ? prevInfo.hairColor : null,
      occupation: prevInfo ? prevInfo.occupation : null,
      halfCast: prevInfo ? prevInfo.halfCast : null,
      enrolmentDate: prevInfo ? new Date(prevInfo.enrolmentDate) : null,
      nationality: prevInfo ? prevInfo.nationality : null,
      formCompleted: prevInfo ? prevInfo.formCompleted : null,
    }));
  }, []);
  return (
    <blockquote className=" mb-0">
      <form>
        <MDBRow>
          <MDBCol md="4">
            <Form.Group controlId="firstName">
              <Form.Label>
                First Name<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                defaultValue={prevInfo ? prevInfo.firstName : null}
                onChange={handleChange}
                placeholder="First Name"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.firstName == true &&
                personalInfo.dataSaved == true
                  ? 'First name ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>
                Date of birth<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="Date"
                name="birthDate"
                defaultValue={
                  prevInfo
                    ? new Date(prevInfo.birthDate).toISOString().substr(0, 10)
                    : null
                }
                onChange={handleChange}
                placeholder="date of birth"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.birthDate == true &&
                personalInfo.dataSaved == true
                  ? 'Birth date ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="height">
              <Form.Label>
                Height<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="height"
                defaultValue={prevInfo ? prevInfo.height : null}
                onChange={handleChange}
                placeholder="Height"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.height == true && personalInfo.dataSaved == true
                  ? 'Height ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="occupation">
              <Form.Label>
                Occupation<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="occupation"
                defaultValue={prevInfo ? prevInfo.occupation : null}
                onChange={handleChange}
                placeholder="Occupation"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.occupation == true &&
                personalInfo.dataSaved == true
                  ? 'Occupation ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>
                Last Name<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                defaultValue={prevInfo ? prevInfo.lastName : null}
                onChange={handleChange}
                placeholder="Last Name"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.lastName == true && personalInfo.dataSaved == true
                  ? 'Last name ' + isRequired
                  : null}
              </p>
            </Form.Group>
          </MDBCol>
          <MDBCol md="4">
            <Form.Group controlId="middleName">
              <Form.Label>
                Middle Name<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                defaultValue={prevInfo ? prevInfo.middleName : null}
                onChange={handleChange}
                placeholder="Middle Name"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.middleName == true &&
                personalInfo.dataSaved == true
                  ? 'Middle name ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="eyeColor">
              <Form.Label>
                Eye Color<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="eyeColor"
                defaultValue={prevInfo ? prevInfo.eyeColor : null}
                onChange={handleChange}
                placeholder="Eye Color"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.eyeColor == true && personalInfo.dataSaved == true
                  ? 'Eye color ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="halfCast">
              <Form.Label>
                Half Cast<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="halfCast"
                defaultValue={prevInfo ? prevInfo.halfCast : null}
                onChange={handleChange}
                placeholder="Half Cast"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.halfCast == true && personalInfo.dataSaved == true
                  ? 'Half cast ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="nationality">
              <Form.Label>
                Nationality<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                defaultValue={prevInfo ? prevInfo.nationality : null}
                onChange={handleChange}
                placeholder="Nationality"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.nationality == true &&
                personalInfo.dataSaved == true
                  ? 'Nationality ' + isRequired
                  : null}
              </p>
            </Form.Group>
          </MDBCol>
          <MDBCol md="4">
            <Form.Group controlId="birthCountry">
              <Form.Label>
                Birth Country<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="birthCountry"
                defaultValue={prevInfo ? prevInfo.birthCountry : null}
                onChange={handleChange}
                placeholder="Birth Country"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.birthCountry == true &&
                personalInfo.dataSaved == true
                  ? 'Country ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="birthCity">
              <Form.Label>
                Birth City<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="birthCity"
                defaultValue={prevInfo ? prevInfo.birthCity : null}
                onChange={handleChange}
                placeholder="Birth City"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.birthCity == true &&
                personalInfo.dataSaved == true
                  ? 'City ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>
                Gender<i style={{ color: 'red' }}>*</i>{' '}
              </Form.Label>
              <Form.Control
                name="gender"
                defaultValue={prevInfo ? prevInfo.gender : null}
                onChange={handleChange}
                as="select"
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </Form.Control>
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.gender == true && personalInfo.dataSaved == true
                  ? 'Gender ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="enrolmentDate">
              <Form.Label>
                Enrolment Date<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="Date"
                name="enrolmentDate"
                defaultValue={
                  prevInfo
                    ? new Date(prevInfo.enrolmentDate)
                        .toISOString()
                        .substr(0, 10)
                    : null
                }
                onChange={handleChange}
                placeholder="Enrolment Date"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.enrolmentDate == true &&
                personalInfo.dataSaved == true
                  ? 'Enrolment date ' + isRequired
                  : null}
              </p>
            </Form.Group>
            <Form.Group controlId="hairColor">
              <Form.Label>
                Hair Color<i style={{ color: 'red' }}>*</i>
              </Form.Label>
              <Form.Control
                type="text"
                name="hairColor"
                defaultValue={prevInfo ? prevInfo.hairColor : null}
                onChange={handleChange}
                placeholder="Hair Color"
              />
              <p style={{ color: 'red' }}>
                {' '}
                {notCompleted.hairColor == true &&
                personalInfo.dataSaved == true
                  ? 'Hair Color ' + isRequired
                  : null}
              </p>
            </Form.Group>
          </MDBCol>
        </MDBRow>
        {/* <MDBRow>
                            <MDBCol md="5"></MDBCol>
                            <MDBBtn color="success" onClick={handleSave}>Save</MDBBtn>
                        </MDBRow> */}
      </form>
    </blockquote>
  );
});
export default PersonalInfo;
