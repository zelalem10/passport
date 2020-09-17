import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBContainer, MDBInput } from 'mdbreact';
import { Form, Card, Row } from 'react-bootstrap';
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
    birthCountry: personalInformation.birthCountry,
    birthCity: personalInformation.birthCity,
    birthDate: personalInformation.dateOfBirth,
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
    console.log(personalInfo);
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
      birthCountry: prevInfo ? prevInfo.birthCountry : null,
      birthCity: prevInfo ? prevInfo.birthCity : null,
      dateOfBirth: prevInfo ? new Date(prevInfo.dateOfBirth) : null,
      height: prevInfo ? prevInfo.height : null,
      gender: prevInfo ? prevInfo.gender : null,
      eyeColor: prevInfo ? prevInfo.eyeColor : null,
      hairColor: prevInfo ? prevInfo.hairColor : null,
      occupation: prevInfo ? prevInfo.occupation : null,
      halfCast: prevInfo ? prevInfo.halfCast : null,
      enrolmentDate: prevInfo ? new Date(prevInfo.enrolmentDate) : null,
      nationality: prevInfo ? prevInfo.nationality : null,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));
  }, []);
  return (
    <MDBContainer className="passport-container pt-3" fluid>
      <Card style={{ marginBottom: '1rem' }}>
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
                  <MDBCol>
                    <MDBInput
                      label="Date of birth"
                      group
                      type="Date"
                      name="birthDate"
                      validate
                      error="wrong"
                      success="right"
                      valueDefault={
                        prevInfo
                          ? new Date(prevInfo.birthDate)
                              .toISOString()
                              .substr(0, 10)
                          : null
                      }
                      onChange={handleChange}
                    />
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

                  <MDBInput
                    label="Enrollment Date"
                    group
                    type="Date"
                    name="enrolmentDate"
                    validate
                    error="wrong"
                    success="right"
                    valueDefault={
                      prevInfo
                        ? new Date(prevInfo.enrolmentDate)
                            .toISOString()
                            .substr(0, 10)
                        : null
                    }
                    onChange={handleChange}
                  />
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
              </MDBRow>
            </form>
          </blockquote>
        </Card.Body>
      </Card>
    </MDBContainer>
  );
});
export default PersonalInfo;
