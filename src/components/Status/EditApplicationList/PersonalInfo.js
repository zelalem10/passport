import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { MDBRow, MDBCol, MDBContainer, MDBInput } from 'mdbreact';
import { Form, Card, Row } from 'react-bootstrap';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../../redux/actions/addPersonalInfoAction';

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk3MjEzNTU5LCJleHAiOjE1OTcyMjc5NTksImlhdCI6MTU5NzIxMzU1OX0.IJihXj3WJQEsNjFjYIL8-Z2LmtKvT250dl04L8YmIIw`,
  },
};

const PersonalInfo = forwardRef((props, ref) => {
  const { personalInformation } = props;
  console.log(personalInformation);
  const [personalInfo, setPersonalInfo] = useState({
    id: personalInformation.id,
    firstName: personalInformation.firstName,
    middleName: personalInformation.middleName,
    lastName: personalInformation.lastName,
    geezFirstName: personalInformation.geezFirstName,
    geezMiddleName: personalInformation.geezMiddleName,
    geezLastName: personalInformation.geezLastName,
    birthPlace: personalInformation.birthPlace,
    dateOfBirth: personalInformation.dateOfBirth,
    gender: personalInformation.gender,
    height: personalInformation.height,
    eyeColor: personalInformation.eyeColor,
    hairColor: personalInformation.hairColor,
    communicationMethod: personalInformation.communicationMethod,
    occupation: personalInformation.occupation,
    halfCast: personalInformation.halfCast,
    enrolmentDate: personalInformation.enrolmentDate,
    nationality: personalInformation.nationality,
    dataSaved: false,
  });
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const personRef = React.useRef();
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
      //alert("Validation")
    },
  }));

  const handleChange = (event) => {
    debugger;
    const { name, value } = event.target;
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  var prevInfo =
    counter.personalInfoReducer[counter.personalInfoReducer.length - 1];
  useEffect(() => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      id: prevInfo ? prevInfo.id : null,
      firstName: prevInfo ? prevInfo.firstName : null,
      middleName: prevInfo ? prevInfo.middleName : null,
      lastName: prevInfo ? prevInfo.lastName : null,

      geezFirstName: prevInfo ? prevInfo.geezFirstName : null,
      geezMiddleName: prevInfo ? prevInfo.geezMiddleName : null,
      geezLastName: prevInfo ? prevInfo.geezLastName : null,
      dateOfBirth: prevInfo ? new Date(prevInfo.dateOfBirth) : null,
      height: prevInfo ? prevInfo.height : null,
      gender: prevInfo ? prevInfo.gender : null,
      eyeColor: prevInfo ? prevInfo.eyeColor : null,
      hairColor: prevInfo ? prevInfo.hairColor : null,
      occupation: prevInfo ? prevInfo.occupation : null,
      halfCast: prevInfo ? prevInfo.halfCast : null,
      birthPlace: prevInfo ? prevInfo.birthPlace : null,
      enrolmentDate: prevInfo ? new Date(prevInfo.enrolmentDate) : null,
      nationality: prevInfo ? prevInfo.nationality : null,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));
  }, []);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(prevInfo ? prevInfo.dateOfBirth : '2014-08-18T21:11:54')
  );
  const [selectedEnrollmentDate, setSelectedEnrollmentDate] = React.useState(
    new Date(prevInfo ? prevInfo.enrolmentDate : '2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPersonalInfo((prevState) => ({
      ...prevState,
      dateOfBirth: date,
    }));
  };
  const handleEnrollmentDateChange = (date) => {
    setSelectedEnrollmentDate(date);
    setPersonalInfo((prevState) => ({
      ...prevState,
      enrolmentDate: date,
    }));
  };
  return (
    <Card.Body>
      <blockquote className=" mb-0">
        <form>
          <MDBRow>
            <MDBCol md="4">
              <MDBCol>
                <MDBInput
                  label="First Name"
                  group
                  name="firstName"
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.firstName : null}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.geezFirstName : null}
                  name="geezFirstName"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="ስም"
                />
              </MDBCol>
              <MDBCol className="date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date of birth"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Height"
                  group
                  type="text"
                  name="height"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.height : null}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Occupation"
                  group
                  type="text"
                  name="occupation"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.occupation : null}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Birth Place"
                  group
                  type="text"
                  name="birthPlace"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.birthPlace : null}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBCol>
            <MDBCol md="4">
              <MDBCol>
                <MDBInput
                  label="Middle Name"
                  group
                  type="text"
                  name="middleName"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.middleName : null}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.geezMiddleName : null}
                  name="geezMiddleName"
                  onBlur={handleChange}
                  type="text"
                  label="የአባት ስም"
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Eye Color"
                  group
                  type="text"
                  name="eyeColor"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.eyeColor : null}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Half Cast"
                  group
                  type="text"
                  name="halfCast"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.halfCast : null}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Nationality"
                  group
                  type="text"
                  name="nationality"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.nationality : null}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Last Name"
                group
                type="text"
                name="lastName"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.lastName : null}
                onChange={handleChange}
              />
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.geezLastName : null}
                  name="geezLastName"
                  onBlur={handleChange}
                  type="text"
                  label="የአያት ስም"
                />
              </MDBCol>
              <MDBCol>
                <div
                  className="md-form form-group passport-select"
                  style={{ 'margin-bottom': '2.5rem' }}
                >
                  <select
                    name="gender"
                    onChange={handleChange}
                    className="browser-default custom-select"
                    defaultValue={prevInfo ? prevInfo.gender : null}
                  >
                    <option style={{ display: 'none' }}>Gender</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
              </MDBCol>
              <MDBCol className="date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Enrollment Date"
                    value={selectedEnrollmentDate}
                    onChange={handleEnrollmentDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Hair Color"
                  group
                  type="text"
                  name="hairColor"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.hairColor : null}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBCol>
          </MDBRow>
        </form>
      </blockquote>
    </Card.Body>
  );
});
export default PersonalInfo;
