import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';

// import 'react-datepicker/dist/react-datepicker.css';
import { MDBRow, MDBCol, MDBContainer, MDBInput } from 'mdbreact';
import { Form, Card, Row } from 'react-bootstrap';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../../redux/actions/addPersonalInfoAction';
import isEmail from 'validator/es/lib/isEmail';
import API from '../../Utils/API';

const PersonalInfo = forwardRef((props, ref) => {
  const [nationalityList, setNationalityList] = useState([]);
  const [occupationList, setOccupationList] = useState([]);
  const { personalInformation } = props;
  const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
      return UserToken;
    } else {
      const SystemToken = localStorage.systemToken;
      return SystemToken;
    }
  };
  const token = tokenValue();
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  };

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
    occupationId: personalInformation.occupationId,
    isHalfCast: personalInformation.isHalfCast,
    nationalityId: personalInformation.nationalityId,
    maritalStatusEnum: personalInformation.passportRes.maritalStatusEnum,
    isUnder18: personalInformation.isUnder18,
    isAdoption: personalInformation.isAdoption,
    phoneNumber: personalInformation.phoneNumber,
    email: personalInformation.email,
    birthCertificateId: personalInformation.passportRes.birthCertificateId,
    dataSaved: false,
    formCompleted: false,
  });

  const [notCompleted, setNotCompleted] = useState({
  
    firstName: personalInformation.firstName ? false : true,
    middleName: personalInformation.middleName ? false : true,
    lastName: personalInformation.lastName ? false : true,
    geezFirstName: personalInformation.geezFirstName ? false : true,
    geezMiddleName: personalInformation.geezMiddleName ? false : true,
    geezLastName: personalInformation.geezLastName ? false : true,
    birthPlace: personalInformation.birthPlace ? false : true,
    birthCertificateId: personalInformation.birthCertificateId ? false : true,
    maritalStatusEnum: personalInformation.passportRes.maritalStatusEnum ? false : true,
    dateOfBirth: personalInformation.dateOfBirth ? false : true,
    gender: personalInformation.gender ? false : true,
    height: personalInformation.height ? false : true,
    eyeColor: personalInformation.eyeColor ? false : true,
    hairColor: personalInformation.hairColor ? false : true,
    occupationId: personalInformation.occupationId ? false : true,
    isHalfCast: personalInformation.isHalfCast ? false : true,
    isUnder18: personalInformation.isUnder18 ? false : true,
    isAdoption: personalInformation.isAdoption ? false : true,
    nationalityId: personalInformation.nationalityId ? false : true,
    phoneNumber: personalInformation.phoneNumber ? false : true,
    email: personalInformation.email ? false : true,
  });
  if (nationalityList.length === 0) {
    setNationalityList(JSON.parse(localStorage.nationalitys));
  }
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const isRequired = 'is required!';
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
      debugger;
      if (
        notCompleted.firstName === true ||
        notCompleted.lastName === true ||
        notCompleted.middleName === true ||
        notCompleted.dateOfBirth === true ||
        notCompleted.geezFirstName === true ||
        notCompleted.geezMiddleName === true ||
        notCompleted.geezLastName === true ||
        personalInfo.nationalityId === 0 ||
        notCompleted.gender === true ||
        notCompleted.occupationId === true ||
        notCompleted.phoneNumber === true ||
        notCompleted.gender === true ||
        notCompleted.maritalStatusEnum === true ||
        notCompleted.birthCertificateId === true ||
        notCompleted.birthPlace===true
      )
        return false;
      else return true;
    },
  }));

  const handleCheck = (name, checked) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

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
    else{
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  };
  var prevInfo = counter.personalInfoReducer[counter.personalInfoReducer.length - 1];
  if (prevInfo !== null && typeof prevInfo !== 'undefined') {
    if (personalInfo.formCompleted === false) {
      setPersonalInfo((prevState) => ({
        ...prevState,
        firstName: prevInfo.firstName,
        middleName: prevInfo.middleName,
        lastName: prevInfo.lastName,
        geezFirstName: prevInfo.geezFirstName,
        geezMiddleName: prevInfo.geezMiddleName,
        geezLastName: prevInfo.geezLastName,
        birthPlace: prevInfo.birthPlace,
        dateOfBirth: prevInfo.dateOfBirth,
        birthCertificateId: prevInfo.birthCertificateId,
        height: prevInfo.height,
        gender: prevInfo.gender,
        eyeColor: prevInfo.eyeColor,
        hairColor: prevInfo.hairColor,
        occupationId: prevInfo.occupationId,
        isHalfCast: prevInfo.isHalfCast,
        isAdoption: prevInfo.isAdoption,
        isUnder18: prevInfo.isUnder18,
        nationalityId: prevInfo.nationalityId,
        phoneNumber: prevInfo.phoneNumber,
        email: prevInfo.email,
        maritalStatusEnum: prevInfo.maritalStatusEnum,
        formCompleted: true,
      }));
    }
  }
 
    useEffect(() => {
      debugger;
      setNotCompleted({
        firstName: personalInfo.firstName ? false : true,
        middleName: personalInfo.middleName ? false : true,
        lastName: personalInfo.lastName ? false : true,
        geezFirstName: personalInfo.geezFirstName ? false : true,
        geezMiddleName: personalInfo.geezMiddleName ? false : true,
        geezLastName: personalInfo.geezLastName ? false : true,
        birthPlace: personalInfo.birthPlace ? false : true,
        birthCertificateId: personalInfo.birthCertificateId ? false : true,
        dateOfBirth: personalInfo.dateOfBirth ? false : true,
        gender: personalInfo.gender ? false : true,
        height: personalInfo.height ? false : true,
        eyeColor: personalInfo.eyeColor ? false : true,
        hairColor: personalInfo.hairColor ? false : true,
        occupationId: personalInfo.occupationId && personalInfo.occupationId !== 0 ? false : true,
        isHalfCast: personalInfo.isHalfCast,
        isUnder18: personalInfo.isUnder18,
        isAdoption: personalInfo.isAdoption,
        nationalityId:personalInfo.nationalityId && personalInfo.nationalityId !== 0 ? false : true,
        maritalStatusEnum: personalInfo.maritalStatusEnum ? false : true,
        phoneNumber: personalInfo.phoneNumber ? false : true,
        email: personalInfo.email ? false : true,
      });
      setOccupationList(JSON.parse(localStorage.occupations));
      if (occupationList.length === 0) {
        API.get(
          'https://epassportservices.azurewebsites.net/Master/api/V1.0/Occupation/GetAll',
          config
        )
          .then((todo) => {
            setOccupationList(todo.data.occupations);
          })
          .catch((err) => {
            console.log('AXIOS ERROR: ', err.response);
          });
      }
    }, []);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(prevInfo ? prevInfo.dateOfBirth : new Date())
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPersonalInfo((prevState) => ({
      ...prevState,
      dateOfBirth: date,
    }));
  };


  return (
    <Card.Body>
    <blockquote className=" mb-0">
      <form>
        <MDBRow>
          <MDBCol md="3">
            <MDBCol className="required-field">
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
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.firstName == true &&
                personalInfo.dataSaved == true
                  ? 'First name ' + isRequired
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            {' '}
            <MDBCol className="required-field">
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
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.middleName == true &&
                personalInfo.dataSaved == true
                  ? 'Middle name ' + isRequired
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            <MDBCol className="required-field">
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
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.lastName == true &&
                personalInfo.dataSaved == true
                  ? 'Last name ' + isRequired
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            {' '}
            <MDBCol className="date-picker birth-Date">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  group
                  id="date-picker-dialog"
                  label="Date of birth"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.dateOfBirth == true &&
                  personalInfo.dataSaved == true
                    ? 'Birth date ' + isRequired
                    : null}
                </span>
              </MuiPickersUtilsProvider>
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="3">
            <MDBCol className="required-field">
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
          </MDBCol>
          <MDBCol md="3">
            <MDBCol className="required-field">
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
          </MDBCol>
          <MDBCol md="3">
            <MDBCol className="required-field">
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
          </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <div
                className="md-form form-group passport-select"
                style={{ 'margin-bottom': '2.5rem' }}
              >
                <label class="passport-selectList-label">
                  Nationality
                  <i
                    class="required-for-select-list"
                    style={{ color: 'red' }}
                  >
                    *
                  </i>{' '}
                </label>
                <select
                  name="nationalityId"
                  onChange={handleChange}
                  className="browser-default custom-select"
                  defaultValue={prevInfo ? prevInfo.nationalityId : 0}
                >
                  <option disabled>select Nationality</option>
                  {nationalityList.map((nationality) => (
                    <option value={nationality.id}>{nationality.name}</option>
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
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="3">
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
              <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.birthPlace === true &&
                    personalInfo.dataSaved === true
                    ? 'Birth Place ' + isRequired
                    : null}
                </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            {' '}
            <MDBCol className="required-field">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.birthCertificateId : null}
                name="birthCertificateId"
                onChange={handleChange}
                type="text"
                label="Birth Registration Unique Id"
                group
                validate
                error="wrong"
                success="right"
              />
              <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.birthCertificateId == true &&
                    personalInfo.dataSaved == true
                    ? 'Birth Reg. Unique Id ' + isRequired
                    : null}
                </span>
                <span style={{ color: 'red' }}>
                  {' '}
                  {(/^[0-9]{1,16}$/.test(personalInfo.birthCertificateId)===false &&
                    personalInfo.dataSaved === true &&personalInfo.birthCertificateId !=="")
                    ? 'Birth Reg. Unique Id must be 16 digit numeric'
                    : null}
                </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <div
                className="md-form form-group passport-select"
                style={{ 'margin-bottom': '2.5rem' }}
              >
                <label class="passport-selectList-label">
                  Gender
                  <i
                    class="required-for-select-list"
                    style={{ color: 'red' }}
                  >
                    *
                  </i>{' '}
                </label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="browser-default custom-select"
                  defaultValue={prevInfo ? prevInfo.gender : null}
                >
                  <option disabled>Gender</option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.gender == true && personalInfo.dataSaved == true
                  ? 'Gender ' + isRequired
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <div
                className="md-form form-group passport-select"
                style={{ 'margin-bottom': '2.5rem' }}
              >
                <label class="passport-selectList-label">
                  Marital Status
                  <i
                    class="required-for-select-list"
                    style={{ color: 'red' }}
                  >
                    *
                  </i>{' '}
                </label>
                <select
                  name="maritalStatusEnum"
                  onChange={handleChange}
                  className="browser-default custom-select"
                  defaultValue={prevInfo ? prevInfo.maritalStatusEnum?prevInfo.maritalStatusEnum:9 : 9}
                >
                  <option disabled value="9">Choose Marital Status</option>
                  <option value="0" >Single</option>
                  <option value="1" >Married</option>
                  <option value="2" >Divorced</option>
                </select>
              </div>
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.maritalStatusEnum == true &&
                personalInfo.dataSaved == true
                  ? 'Martial status ' + isRequired
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="3">
            <MDBCol>
              <div
                className="md-form form-group passport-select"
                style={{ 'margin-bottom': '2.5rem' }}
              >
                <label class="passport-selectList-label">
                  Occupation
                  <i
                    class="required-for-select-list"
                    style={{ color: 'red' }}
                  >
                    *
                  </i>{' '}
                </label>
                <select
                  name="occupationId"
                  onChange={handleChange}
                  className="browser-default custom-select"
                  defaultValue={prevInfo ? prevInfo.occupationId : 0}
                >
                  <option disabled>select Occupation</option>
                  {occupationList.map((occupation) => (
                    <option value={occupation.id}>{occupation.title}</option>
                  ))}
                </select>
              </div>
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.occupationId == true &&
                personalInfo.dataSaved == true
                  ? 'Occupation ' + isRequired
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <MDBInput
                label="Height(cm)"
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
          </MDBCol>
          <MDBCol md="3">
              
                  <div
                className="md-form form-group passport-select"
                style={{ 'margin-bottom': '2.5rem' }}
              >
                <label class="passport-selectList-label">Eye Color</label>
                <select
                  name="eyeColor"
                  onChange={handleChange}
                  className="browser-default custom-select"
                >
                  <option disabled value="" selected={personalInfo.eyeColor?false:true }> Select eye color </option>
                  <option
                    value="Black"
                    selected={personalInfo.eyeColor === 'Black'}
                  >
                    {' '}
                    Black{' '}
                  </option>
                  <option
                    value="Brown"
                    selected={personalInfo.eyeColor === 'Brown'}
                  >
                    {' '}
                    Brown{' '}
                  </option>
                  <option
                    value="Blue"
                    selected={personalInfo.eyeColor === 'Blue'}
                  >
                    {' '}
                    Blue{' '}
                  </option>
                  <option
                    value="Other"
                    selected={personalInfo.eyeColor === 'Other'}
                  >
                    {' '}
                    Other{' '}
                  </option>
                </select>
              </div>
            </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <div
                className="md-form form-group passport-select"
                style={{ 'margin-bottom': '2.5rem' }}
              >
                <label class="passport-selectList-label">Hair Color</label>
                <select
                  name="hairColor"
                  onChange={handleChange}
                  className="browser-default custom-select"
                >
                  <option disabled value="" selected={personalInfo.hairColor?false:true }> Select hair color </option>
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
              </div>
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="3">
            <MDBCol className="required-field">
              <MDBInput
                label="Phone Number"
                group
                type="tel"
                name="phoneNumber"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.phoneNumber : null}
                onChange={handleChange}
              />
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.phoneNumber == true &&
                personalInfo.dataSaved == true
                  ? 'Phone Number ' + isRequired
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <MDBInput
                label="Email"
                group
                type="email"
                name="email"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.email : null}
                onChange={handleChange}
              />
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.email === false &&
                isEmail(personalInfo.email) === false &&
                personalInfo.dataSaved == true
                  ? 'Please insert the correct email format'
                  : null}
              </span>
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="3">
            <MDBCol>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  defaultChecked={prevInfo ? prevInfo.isHalfCast : false}
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
          </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  defaultChecked={prevInfo ? prevInfo.isUnder18 : false}
                  name="isUnder18"
                  id="isUnder18"
                  onChange={(e) => handleCheck('isUnder18', e.target.checked)}
                />
                <label class="custom-control-label" for="isUnder18">
                  Is Under 18
                </label>
              </div>
            </MDBCol>
          </MDBCol>
          <MDBCol md="3">
            <MDBCol>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  group
                  class="custom-control-input"
                  defaultChecked={prevInfo ? prevInfo.isAdoption : false}
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
          </MDBCol>
        </MDBRow>
      </form>
    </blockquote>
  </Card.Body>
  );
});
export default PersonalInfo;
