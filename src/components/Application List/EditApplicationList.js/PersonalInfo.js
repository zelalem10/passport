import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBContainer } from 'mdbreact';
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
      birthDate: prevInfo ? new Date(prevInfo.dateOfBirth) : null,
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
          <blockquote className="blockquote mb-0">
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
                          ? new Date(prevInfo.birthDate)
                              .toISOString()
                              .substr(0, 10)
                          : null
                      }
                      onChange={handleChange}
                      placeholder="date of birth"
                    />
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
                  </Form.Group>

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
                    <option value="2">Female</option>
                  </Form.Control>
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
    </MDBContainer>
  );
});
export default PersonalInfo;
