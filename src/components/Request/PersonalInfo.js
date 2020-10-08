import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBContainer,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '../Application List/viewAppointment.css';
import DateFnsUtils from '@date-io/date-fns';
import API from '../Utils/API';
import isEmail from 'validator/es/lib/isEmail';

const PersonalInfo = forwardRef((props, ref) => {
  const [nationalityList, setNationalityList] = useState([]);
  const [occupationList, setOccupationList] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: prevInfo ? prevInfo.firstName : '',
    middleName: prevInfo ? prevInfo.middleName : '',
    lastName: prevInfo ? prevInfo.lastName : '',
    geezFirstName: prevInfo ? prevInfo.geezFirstName : '',
    geezMiddleName: prevInfo ? prevInfo.geezMiddleName : '',
    geezLastName: prevInfo ? prevInfo.geezLastName : '',
    birthPlace: prevInfo ? prevInfo.birthPlace : '',
    birthDate: prevInfo ? prevInfo.birthDate : '',
    birthCertificatNo: prevInfo ? prevInfo.birthCertificatNo : '',
    height: prevInfo ? prevInfo.height : '',
    gender: prevInfo ? prevInfo.gender : '',
    eyeColor: prevInfo ? prevInfo.eyeColor : '',
    hairColor: prevInfo ? prevInfo.hairColor : 'Black',
    occupationId: prevInfo ? prevInfo.occupationId : 0,
    isHalfCast: prevInfo ? prevInfo.isHalfCast : false,
    isAdoption: prevInfo ? prevInfo.isAdoption : false,
    isUnder18: prevInfo ? prevInfo.isUnder18 : false,
    nationalityId: prevInfo ? prevInfo.nationalityId : 0,
    phoneNumber: prevInfo ? prevInfo.phoneNumber : '',
    email: prevInfo ? prevInfo.email : '',
    martialStatus: prevInfo ? prevInfo.martialStatus : '',
    dataSaved: false,
    formCompleted: false,
  });
  const [notCompleted, setNotCompleted] = useState({
    firstName: true,
    middleName: true,
    lastName: true,
    geezFirstName: true,
    geezMiddleName: true,
    geezLastName: true,
    birthPlace: true,
    birthCertificatNo: true,
    martialStatus: true,
    birthDate: true,
    gender: true,
    height: true,
    eyeColor: true,
    hairColor: true,
    occupationId: true,
    isHalfCast: true,
    isUnder18: true,
    isAdoption: true,
    nationalityId: true,
    phoneNumber: true,
    email: true,
  });
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const isRequired = 'is required!';
  if (counter.personalInfoReducer.length === 0) {
    dispatch(addPersonalInfo(personalInfo));
  }
  const accesstoken = localStorage.systemToken;
  const usertoken = localStorage.userToken;
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };
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
        geezFirstName: personalInfo.geezFirstName === '' ? true : false,
        geezMiddleName: personalInfo.geezMiddleName === '' ? true : false,
        geezLastName: personalInfo.geezLastName === '' ? true : false,
        birthPlace: personalInfo.birthPlace === '' ? true : false,
        birthCertificatNo: personalInfo.birthCertificatNo === '' ? true : false,
        birthDate: personalInfo.birthDate === '' ? true : false,
        gender: personalInfo.gender === '' ? true : false,
        height: personalInfo.height === '' ? true : false,
        eyeColor: personalInfo.eyeColor === '' ? true : false,
        hairColor: personalInfo.hairColor === '' ? true : false,
        occupationId: personalInfo.occupationId === 0 ? true : false,
        isHalfCast: personalInfo.isHalfCast,
        isUnder18: personalInfo.isUnder18,
        isAdoption: personalInfo.isAdoption,
        nationalityId: personalInfo.nationalityId === 0 ? true : false,
        martialStatus: personalInfo.martialStatus === '' ? true : false,
        phoneNumber: personalInfo.phoneNumber === '' ? true : false,
        email: personalInfo.email === '' ? true : false,
      });
      if (
        notCompleted.firstName == true ||
        notCompleted.lastName ||
        notCompleted.middleName == true ||
        notCompleted.birthDate == true ||
        notCompleted.geezFirstName == true ||
        notCompleted.geezLastName ||
        notCompleted.geezLastName == true ||
        notCompleted.nationality == true ||
        notCompleted.gender == true ||
        notCompleted.occupationId == true ||
        notCompleted.phoneNumber == true ||
        notCompleted.email == true ||
        notCompleted.gender == true ||
        notCompleted.martialStatus == true
      )
        return false;
      else return true;
    },
  }));
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(prevInfo ? prevInfo.dateOfBirth : new Date())
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPersonalInfo((prevState) => ({
      ...prevState,
      birthDate: date,
    }));
    if (date != '') {
      setNotCompleted((prevState) => ({
        ...prevState,
        birthDate: false,
      }));
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value != '' && value != 0) {
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
    dispatch(addPersonalInfo(personalInfo));
  };
  const handleCheck = (name, checked) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  var prevInfo =
    counter.personalInfoReducer[counter.personalInfoReducer.length - 1];
  useEffect(() => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      firstName: prevInfo ? prevInfo.firstName : '',
      middleName: prevInfo ? prevInfo.middleName : '',
      lastName: prevInfo ? prevInfo.lastName : '',
      geezFirstName: prevInfo ? prevInfo.geezFirstName : '',
      geezMiddleName: prevInfo ? prevInfo.geezMiddleName : '',
      geezLastName: prevInfo ? prevInfo.geezLastName : '',
      birthPlace: prevInfo ? prevInfo.birthPlace : '',
      birthDate: prevInfo ? prevInfo.birthDate : '',
      birthCertificatNo: prevInfo ? prevInfo.birthCertificatNo : '',
      height: prevInfo ? prevInfo.height : '',
      gender: prevInfo ? prevInfo.gender : '',
      eyeColor: prevInfo ? prevInfo.eyeColor : '',
      hairColor: prevInfo ? prevInfo.hairColor : 'Black',
      occupationId: prevInfo ? prevInfo.occupationId : 0,
      isHalfCast: prevInfo ? prevInfo.isHalfCast : false,
      isAdoption: prevInfo ? prevInfo.isAdoption : false,
      isUnder18: prevInfo ? prevInfo.isUnder18 : false,
      nationalityId: prevInfo ? prevInfo.nationalityId : 0,
      phoneNumber: prevInfo ? prevInfo.phoneNumber : '',
      email: prevInfo ? prevInfo.email : '',
      martialStatus: prevInfo ? prevInfo.martialStatus : '',
    }));
    setNationalityList(JSON.parse(localStorage.nationalitys))
    if (nationalityList.length === 0) {
      API.get(
        'https://epassportservices.azurewebsites.net/Master/api/V1.0/Nationality/GetAll',
        config
      )
        .then((todo) => {
          setNationalityList(todo.data.nationalitys);
          if (prevInfo && Number.parseInt(prevInfo.nationalityId, 10) === 0) {
            setPersonalInfo((prevState) => ({
              ...prevState,
              nationalityId: todo.data.nationalitys.filter(
                (nationality) => nationality.code == 'ET'
              )[0]
                ? todo.data.nationalitys.filter(
                  (nationality) => nationality.code == 'ET'
                )[0].id
                : 0,
            }));
          }
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
    }

    setOccupationList(JSON.parse(localStorage.occupations))
    if (occupationList.length === 0) {
      API.get('https://epassportservices.azurewebsites.net/Master/api/V1.0/Occupation/GetAll', config)
        .then((todo) => {
          setOccupationList(todo.data.occupations);
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
    }
  }, []);
  return (
    <MDBContainer>
      <MDBCard style={{ marginBottom: '1rem' }}>
        <MDBCardBody>
          <form>
            <MDBRow>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.firstName : null}
                  name="firstName"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="First name"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.firstName == true &&
                    personalInfo.dataSaved == true
                    ? 'First name ' + isRequired
                    : null}
                </span>
              </MDBCol>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.middleName : null}
                  name="middleName"
                  onBlur={handleChange}
                  type="text"
                  label="Middle name"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.middleName == true &&
                    personalInfo.dataSaved == true
                    ? 'Middle name ' + isRequired
                    : null}
                </span>
              </MDBCol>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.lastName : null}
                  name="lastName"
                  onBlur={handleChange}
                  type="text"
                  label="Last name"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.lastName == true &&
                    personalInfo.dataSaved == true
                    ? 'Last name ' + isRequired
                    : null}
                </span>
              </MDBCol>
              <MDBCol md="3" className="date-picker ">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.birthDate == true &&
                    personalInfo.dataSaved == true
                    ? 'Birth date ' + isRequired
                    : null}
                </span>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.geezFirstName : null}
                  name="geezFirstName"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="ስም"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.geezFirstName == true &&
                    personalInfo.dataSaved == true
                    ? 'የአመልካቹ ስም አስፈላጊ ነው'
                    : null}
                </span>
              </MDBCol>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.geezMiddleName : null}
                  name="geezMiddleName"
                  onBlur={handleChange}
                  type="text"
                  label="የአባት ስም"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.geezMiddleName == true &&
                    personalInfo.dataSaved == true
                    ? 'የአባት ስም አስፈላጊ ነው'
                    : null}
                </span>
              </MDBCol>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.geezLastName : null}
                  name="geezLastName"
                  onBlur={handleChange}
                  type="text"
                  label="የአያት ስም"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.geezLastName == true &&
                    personalInfo.dataSaved == true
                    ? 'የአያት ስም አስፈላጊ ነው'
                    : null}
                </span>
              </MDBCol>
              <MDBCol md="3" className="required-field">
                <div>
                  <label>
                    Nationality<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select
                    className="browser-default custom-select"
                    name="nationalityId"
                    onChange={handleChange}
                  >
                    <option>select Nationality</option>
                    {nationalityList.map((nationality) => (
                      <option
                        value={nationality.id}
                        selected={
                          prevInfo &&
                            Number.parseInt(prevInfo.nationalityId, 10) ===
                            nationality.id
                            ? true
                            : nationality.code === 'ET'
                        }
                      >
                        {nationality.code}
                      </option>
                    ))}
                  </select>
                </div>
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.nationalityId == true &&
                    personalInfo.dataSaved == true
                    ? 'Nationality ' + isRequired
                    : null}
                </span>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.phoneNumber : null}
                  name="phoneNumber"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Phone Number"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.phoneNumber == true &&
                    personalInfo.dataSaved == true
                    ? 'Phone Number ' + isRequired
                    : null}
                </span>
              </MDBCol>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.email : null}
                  name="email"
                  className="form-control"
                  onBlur={handleChange}
                  type="email"
                  label="Email"
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.email === true &&
                    personalInfo.dataSaved === true
                    ? 'Email ' + isRequired
                    : null}
                </span>
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.email === false &&
                    isEmail(personalInfo.email) === false &&
                    personalInfo.dataSaved == true
                    ? 'Please insert the correct email formatt'
                    : null}
                </span>
              </MDBCol>

              <MDBCol md="3">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.birthPlace : null}
                  name="birthPlace"
                  className="form-control"
                  onChange={handleChange}
                  type="text"
                  label="Birth Place"
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.birthCirtificateNo : null}
                  name="birthCertificatNo"
                  onChange={handleChange}
                  type="text"
                  label="Birth Certificat No"
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="3">
                <div>
                  <label>
                    Occupation<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select
                    className="browser-default custom-select"
                    name="occupationId"
                    onChange={handleChange}
                  >
                    <option>select Occupation</option>
                    {occupationList.map((occupation) => (
                      <option
                        value={occupation.id}
                        selected={
                          occupation.id ===
                          Number.parseInt(personalInfo.occupationId, 10)
                        }
                      >
                        {occupation.title}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.occupationId == true &&
                      personalInfo.dataSaved == true
                      ? 'Occupation ' + isRequired
                      : null}
                  </span>
                </div>
              </MDBCol>
              <MDBCol md="3">
                <label>Hair Color</label>
                <select
                  className="browser-default custom-select"
                  name="hairColor"
                  onChange={handleChange}
                >
                  <option
                    value="Black"
                    selected={personalInfo.hairColor === 'Black'}
                  >
                    Black
                  </option>
                  <option
                    value="Brown"
                    selected={personalInfo.hairColor === 'Brown'}
                  >
                    Brown
                  </option>
                  <option
                    value="Blond"
                    selected={personalInfo.hairColor === 'Blond'}
                  >
                    Blond
                  </option>
                  <option
                    value="Auburn"
                    selected={personalInfo.hairColor === 'Auburn'}
                  >
                    Auburn
                  </option>
                  <option
                    value="Red"
                    selected={personalInfo.hairColor === 'Red'}
                  >
                    Red
                  </option>
                  <option
                    value="Grey"
                    selected={personalInfo.hairColor === 'Grey'}
                  >
                    Grey
                  </option>
                  <option
                    value="White"
                    selected={personalInfo.hairColor === 'White'}
                  >
                    White
                  </option>
                </select>
              </MDBCol>
              <MDBCol md="3">
                <div>
                  <label>
                    Gender <i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select
                    className="browser-default custom-select"
                    name="gender"
                    onChange={handleChange}
                  >
                    <option value="" selected={personalInfo.gender === ''}>
                      Select gender
                    </option>
                    <option value="1" selected={personalInfo.gender === '1'}>
                      Male
                    </option>
                    <option value="0" selected={personalInfo.gender === '0'}>
                      Female
                    </option>
                  </select>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.gender == true &&
                      personalInfo.dataSaved == true
                      ? 'Gender ' + isRequired
                      : null}
                  </span>
                </div>
              </MDBCol>
              <MDBCol md="3">
                <div>
                  <label>
                    Martial status <i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select
                    className="browser-default custom-select"
                    name="martialStatus"
                    onChange={handleChange}
                  >
                    <option
                      value=""
                      selected={personalInfo.martialStatus === ''}
                    >
                      Select status
                    </option>
                    <option
                      value="0"
                      selected={personalInfo.martialStatus === '0'}
                    >
                      Single
                    </option>
                    <option
                      value="1"
                      selected={personalInfo.martialStatus === '1'}
                    >
                      Married
                    </option>
                    <option
                      value="2"
                      selected={personalInfo.martialStatus === '2'}
                    >
                      Divorced
                    </option>
                  </select>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.martialStatus == true &&
                      personalInfo.dataSaved == true
                      ? 'Martial status ' + isRequired
                      : null}
                  </span>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="3">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.height : null}
                  name="height"
                  onChange={handleChange}
                  type="text"
                  label="Height(cm)"
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.eyeColor : null}
                  name="eyeColor"
                  onChange={handleChange}
                  type="text"
                  label="Eye Color"
                />
              </MDBCol>
              <MDBCol md="3">
                <label></label>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    defaultValue={prevInfo ? prevInfo.isHalfCast : false}
                    name="isHalfCast"
                    id="isHalfCast"
                    onChange={(e) =>
                      handleCheck('isHalfCast', e.target.checked)
                    }
                  />
                  <label class="custom-control-label" for="isHalfCast">
                    Is Halfcast
                  </label>
                </div>
              </MDBCol>
              <MDBCol md="3">
                <label></label>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    name="isUnder18"
                    id="isUnder18"
                    onChange={(e) => handleCheck('isUnder18', e.target.checked)}
                  />
                  <label class="custom-control-label" for="isUnder18">
                    Is Under 18
                  </label>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <label></label>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    name="isAdoption"
                    id="isAdoption"
                    onChange={(e) =>
                      handleCheck('isAdoption', e.target.checked)
                    }
                  />
                  <label class="custom-control-label" for="isAdoption">
                    Is Adoption
                  </label>
                </div>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
});
export default PersonalInfo;
