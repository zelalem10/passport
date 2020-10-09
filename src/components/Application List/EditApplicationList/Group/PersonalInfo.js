import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../../../redux/actions/addPersonalInfoAction';

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
        geezFirstName: applicants[i].geezFirstName,
        geezMiddleName: applicants[i].geezMiddleName,
        geezLastName: applicants[i].geezLastName,
        birthPlace: applicants[i].birthPlace,
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
    birthPlace: true,
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
        birthPlace: personalInfo.birthPlace === '' ? true : false,
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
        notCompleted.birthPlace == true ||
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
      geezFirstName: prevInfo ? prevInfo.geezFirstName : null,
      geezMiddleName: prevInfo ? prevInfo.geezMiddleName : null,
      geezLastName: prevInfo ? prevInfo.geezLastName : null,
      birthPlace: prevInfo ? prevInfo.birthPlace : null,
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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(prevInfo ? prevInfo.birthDate : new Date())
  );
  const [selectedEnrollmentDate, setSelectedEnrollmentDate] = React.useState(
    new Date(prevInfo ? prevInfo.enrolmentDate : new Date())
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPersonalInfo((prevState) => ({
      ...prevState,
      birthDate: date,
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
                {/* <KeyboardDatePicker
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
                /> */}
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date of birth"
                  format="MM/dd/yyyy"
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
                {/* <KeyboardDatePicker
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
                /> */}
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Enrollment Date"
                  format="MM/dd/yyyy"
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
  );
});
export default PersonalInfo;
