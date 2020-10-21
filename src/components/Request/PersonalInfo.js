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
import { useTranslation, Trans } from 'react-i18next';


const PersonalInfo = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [nationalityList, setNationalityList] = useState([]);
  const [occupationList, setOccupationList] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    geezFirstName: '',
    geezMiddleName: '',
    geezLastName: '',
    birthPlace: '',
    birthDate: '',
    birthCertificatNo: '',
    height: '',
    gender: '',
    eyeColor: '',
    hairColor: 'Black',
    occupationId: 0,
    isHalfCast: false,
    isAdoption: false,
    isUnder18: false,
    nationalityId: 0,
    phoneNumber: '',
    email: '',
    martialStatus: '',
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
  const [age, setAge] = useState(0);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidUniqueId, setInvalidUniqueId] = useState(false);

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandFatherName, setGrandFatherName] = useState("");

  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const isRequired = 'is required!';
  const accesstoken = localStorage.systemToken;
  const usertoken = localStorage.userToken;
  const digitPattern = new RegExp(/^[0-9\b]+$/);
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
      if (
        notCompleted.firstName === true ||
        notCompleted.lastName === true ||
        notCompleted.middleName === true ||
        notCompleted.birthDate === true ||
        notCompleted.geezFirstName === true ||
        notCompleted.geezMiddleName === true ||
        notCompleted.geezLastName === true ||
        personalInfo.nationalityId === 0 ||
        notCompleted.gender === true ||
        notCompleted.occupationId === true ||
        notCompleted.phoneNumber === true ||
        notCompleted.gender === true ||
        notCompleted.martialStatus === true ||
        notCompleted.birthCertificatNo === true ||
        notCompleted.birthPlace===true ||
        invalidUniqueId===true ||
        invalidPhone ===true ||
        (age<18 && personalInfo.isUnder18===false)
      )
        return false;
      else return true;
    },
  }));
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(prevInfo ? prevInfo.dateOfBirth : new Date())
  );
  function calculateAge(date1, date2) {
    debugger
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;
  
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    setAge(years)
    return years
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
    debugger
    const currentDate = new Date();
    const diffYear=calculateAge(currentDate, new Date(date))
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
      [name]: value//.replace(/[^0-9]/g, ""),
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
    // dispatch(addPersonalInfo(personalInfo));
  };
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    if (value.length != 9 && value.length !=10) {
      setInvalidPhone(true);
    }
    else if (!digitPattern.test(value)) {
      setInvalidPhone(true);
    }
    else if (value.length===9 &&value.charAt(0) !=='9') {
      setInvalidPhone(true);
    }
    else if (value.length===10 &&value.substring(0,2) !=='09') {
      setInvalidPhone(true);
    }
    else {
      setInvalidPhone(false);
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
      else {
        setNotCompleted((prevState) => ({
          ...prevState,
          [name]: true,
        }));
      }
    }
  };
  const handleUniqueIdChange = (event) => {
    const { name, value } = event.target;
    if(value.length !=16){
      setInvalidUniqueId(true);
    }
    else if(!digitPattern.test(value)){
      setInvalidUniqueId(true);
    }
    else{
      setInvalidUniqueId(false);
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
    }
  };
  const handleCheck = (name, checked) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
        birthDate: prevInfo.birthDate,
        birthCertificatNo: prevInfo.birthCertificatNo,
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
        martialStatus: prevInfo.martialStatus,
        formCompleted: true,
      }));
    }
  }

  if(isLoading){
    debugger
    if (localStorage.getItem("nationalitys") !== null) {
      let localNatio=JSON.parse(localStorage.nationalitys);
      setNationalityList(JSON.parse(localStorage.nationalitys));
      let defaultNationality=localNatio.filter((nationality) => nationality.code === 'ET');
              setPersonalInfo((prevState) => ({
                ...prevState,
                nationalityId: defaultNationality[0].id,
              }));
              setNotCompleted((prevState) => ({
                ...prevState,
                nationalityId: false,
              }));
    }
    if (personalInfo.nationalityId=== 0) {
      API.get(
        'https://epassportservices.azurewebsites.net/Master/api/V1.0/Nationality/GetAll',
        config
      )
        .then((todo) => {
          setNationalityList(todo.data.nationalitys);
          let defaultNationality=todo.data.nationalitys.filter((nationality) => nationality.code === 'ET');
      setPersonalInfo((prevState) => ({
        ...prevState,
        nationalityId: defaultNationality[0].id,
      }));
      setNotCompleted((prevState) => ({
        ...prevState,
        nationalityId: false,
      }));
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
      
    }
setIsLoading(false)  
  }
  

  useEffect(() => {
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
                  value={name}
                  onChange={e => setName(e.target.value.replace(/^[0-9\b]+$/, ""))}
                  type="text"
                  label= {t('requestForm.firstname')}
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
                  value={fatherName}
                  onChange={e => setFatherName(e.target.value.replace(/^[0-9\b]+$/, ""))}
                  type="text"
                  label={t('requestForm.middleName')}
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
                  value={grandFatherName}
                  onChange={e => setGrandFatherName(e.target.value.replace(/^[0-9\b]+$/, ""))}
                  type="text"
                  label={t('requestForm.lastName')}
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
                    label="Date of birth(GC)"
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
                  label={t('requestForm.amharicFirstname')}
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
                  label={t('requestForm.amharicMiddleName')}
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
                  label={t('requestForm.amharicLastName')}
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
                  {t('requestForm.nationality')}<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select
                    className="browser-default custom-select"
                    name="nationalityId"
                    onChange={handleChange}
                  >
                    <option>Select nationality</option>
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
                        {nationality.name}
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
                <MDBRow>
                  {/* <MDBCol md="2">
                  <label>+251</label>
                  </MDBCol> */}
                  <MDBCol md="10">
                  <MDBInput
                  valueDefault={prevInfo ? prevInfo.phoneNumber : null}
                  name="phoneNumber"
                  className="form-control"
                  onBlur={handlePhoneChange}
                  type="text"
                  label={t('requestForm.phoneNumber')}
                //icon=""
                />
                
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.phoneNumber == true &&
                    personalInfo.dataSaved == true
                    ? 'Phone Number ' + isRequired
                    : null}
                </span>
                <span style={{ color: 'red' }}>
                    {' '}
                    {(invalidPhone === true)
                      ? 'Please insert the correct phone number format'
                      : null}
                  </span>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.email : null}
                  name="email"
                  className="form-control"
                  onBlur={handleChange}
                  type="email"
                  label={t('requestForm.email')}
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.email === false &&
                    isEmail(personalInfo.email) === false &&
                    personalInfo.dataSaved == true
                    ? 'Please insert the correct email formatt'
                    : null}
                </span>
              </MDBCol>

              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.birthPlace : null}
                  name="birthPlace"
                  className="form-control"
                  onChange={handleChange}
                  type="text"
                  label={t('requestForm.birthPlace')}
                />
                <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.birthPlace === true &&
                      personalInfo.dataSaved === true
                      ? 'Birth Place ' + isRequired
                      : null}
                  </span>
              </MDBCol>
              <MDBCol md="3" className="required-field">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.birthCirtificateNo : null}
                  name="birthCertificatNo"
                  onBlur={handleUniqueIdChange}
                  type="text"
                  label={t('requestForm.birthCertificatNo')}
                />
                <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.birthCertificatNo == true &&
                      personalInfo.dataSaved == true
                      ? 'Birth Reg. Unique Id ' + isRequired
                      : null}
                  </span>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {(invalidUniqueId === true)
                      ? 'Birth registration unique id length must 16 digit'
                      : null}
                  </span>
              </MDBCol>

            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol md="3">
                <div>
                  <label>
                  {t('requestForm.occupation')}<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select
                    className="browser-default custom-select"
                    name="occupationId"
                    onChange={handleChange}
                  >
                    <option>Select occupation</option>
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
                <label>{t('requestForm.hairColor')}</label>
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
                  {t('requestForm.gender')} <i style={{ color: 'red' }}>*</i>{' '}
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
                  {t('requestForm.martialStatus')} <i style={{ color: 'red' }}>*</i>{' '}
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
                    <option value="2" selected={personalInfo.martialStatus === '2'}>
                      Divorced
                    </option>
                    <option value="3" selected={personalInfo.martialStatus === '3'}>
                      Widowed
                    </option>
                  </select>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.martialStatus == true &&
                      personalInfo.dataSaved == true
                      ? 'Marital status ' + isRequired
                      : null}
                  </span>
                </div>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol md="3">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.height : null}
                  name="height"
                  onChange={handleChange}
                  type="text"
                  label={t('requestForm.height')}
                />
              </MDBCol>
              <MDBCol md="3">
                <div>
                  <label>{t('requestForm.eyeColor')}</label>
                  <select
                    className="browser-default custom-select"
                    name="eyeColor"
                    onChange={handleChange}
                  >
                    <option value=""> Select eye color </option>
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
                  {t('requestForm.isHalfCast')}
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
                  {t('requestForm.isUnder18')}  
                  </label>
                </div>
                <span style={{ color: 'red' }}>
                    {' '}
                    {(age<18 && personalInfo.isUnder18===false && personalInfo.dataSaved===true)? 'Please check if age is under 18 '
                      : null}
                  </span>
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
                  {t('requestForm.isAdoption')} 
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
