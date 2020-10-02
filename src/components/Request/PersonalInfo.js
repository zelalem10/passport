import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBContainer } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import '../Application List/viewAppointment.css'
import DateFnsUtils from '@date-io/date-fns';
import API from '../Utils/API';

const PersonalInfo = forwardRef((props, ref) => {
    const [nationalityList, setNationalityList] = useState([])
    const [occupationList, setOccupationList] = useState([])
    const [defaultNationalityId, setDefaultNationalityId]=useState(0);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        geezFirstName: "",
        geezMiddleName: "",
        geezLastName: "",
        birthPlace: "",
        birthCertificatNo: "",
        birthDate: "",
        gender: "1",
        height: "",
        eyeColor: "",
        hairColor: "Black",
        martialStatus: "0",
        occupationId: 0,
        isHalfCast: false,
        isUnder18: false,
        isAdoption: false,
        nationalityId: defaultNationalityId,
        phoneNumber: "",
        email: "",
        dataSaved: false,
        formCompleted: false
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
        martialStatus: false,
        birthDate: true,
        gender: false,
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
    const isRequired = "is required!"
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
                firstName: personalInfo.firstName === "" ? true : false,
                middleName: personalInfo.middleName === "" ? true : false,
                lastName: personalInfo.lastName === "" ? true : false,
                geezFirstName: personalInfo.geezFirstName === "" ? true : false,
                geezMiddleName: personalInfo.geezMiddleName === "" ? true : false,
                geezLastName: personalInfo.geezLastName === "" ? true : false,
                birthPlace: personalInfo.birthPlace === "" ? true : false,
                birthCertificatNo: personalInfo.birthCertificatNo === "" ? true : false,
                birthDate: personalInfo.birthDate === "" ? true : false,
                gender: personalInfo.gender === "" ? true : false,
                height: personalInfo.height === "" ? true : false,
                eyeColor: personalInfo.eyeColor === "" ? true : false,
                hairColor: personalInfo.hairColor === "" ? true : false,
                occupationId: personalInfo.occupationId === 0 ? true : false,
                isHalfCast: personalInfo.isHalfCast,
                isUnder18: personalInfo.isUnder18,
                isAdoption: personalInfo.isAdoption,
                nationalityId: personalInfo.nationalityId === 0 ? true : false,
                martialStatus: personalInfo.martialStatus === "" ? true : false,
                phoneNumber: personalInfo.phoneNumber === "" ? true : false,
                email: personalInfo.email === "" ? true : false,
            })
            if (notCompleted.firstName == true || notCompleted.lastName || notCompleted.middleName == true
                || notCompleted.birthDate == true || notCompleted.geezFirstName == true || notCompleted.geezLastName
                || notCompleted.geezLastName == true || notCompleted.nationality == true || notCompleted.gender == true
                || notCompleted.occupationId == true|| notCompleted.phoneNumber == true|| notCompleted.email == true
            )
                return false;
            else
                return true
        }
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
        if (date != "") {
            setNotCompleted((prevState) => ({
                ...prevState,
                birthDate: false,
            }))
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        if (value != "" && value != 0) {
            setNotCompleted((prevState) => ({
                ...prevState,
                [name]: false,
            }))
        }
        dispatch(addPersonalInfo(personalInfo));
    }
    const handleCheck = (name, checked) => {
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: checked,
        }))
    }
    var prevInfo = counter.personalInfoReducer[counter.personalInfoReducer.length - 1]
    useEffect(() => {
        setPersonalInfo((prevState) => ({
            ...prevState,
            firstName: prevInfo ? prevInfo.firstName : "",
            middleName: prevInfo ? prevInfo.middleName : "",
            lastName: prevInfo ? prevInfo.lastName : "",
            geezFirstName: prevInfo ? prevInfo.geezFirstName : "",
            geezMiddleName: prevInfo ? prevInfo.geezMiddleName : "",
            geezLastName: prevInfo ? prevInfo.geezLastName : "",
            birthPlace: prevInfo ? prevInfo.birthPlace : "",
            birthDate: prevInfo ? prevInfo.birthDate : "",
            birthCertificatNo: prevInfo ? prevInfo.birthCertificatNo : "",
            height: prevInfo ? prevInfo.height : "",
            gender: prevInfo ? prevInfo.gender : "1",
            eyeColor: prevInfo ? prevInfo.eyeColor : "",
            hairColor: prevInfo ? prevInfo.hairColor : "Black",
            occupationId: prevInfo ? prevInfo.occupationId : 0,
            isHalfCast: prevInfo ? prevInfo.isHalfCast : false,
            isAdoption: prevInfo ? prevInfo.isAdoption : false,
            isUnder18: prevInfo ? prevInfo.isUnder18 : false,
            nationalityId: prevInfo ? prevInfo.nationalityId : 0,
            phoneNumber: prevInfo ? prevInfo.phoneNumber : "",
            email: prevInfo ? prevInfo.email : "",
        }))
        API.get('https://epassportservices.azurewebsites.net/Master/api/V1.0/Nationality/GetAll', config)
            .then((todo) => {
                setNationalityList(todo.data.nationalitys);
                setPersonalInfo((prevState) => ({
                    ...prevState,
                    nationalityId: todo.data.nationalitys.filter((nationality)=>nationality.code=="ET")[0]?todo.data.nationalitys.filter((nationality)=>nationality.code=="ET")[0].id:0,
                }))
            })
            .catch((err) => {
                console.log('AXIOS ERROR: ', err.response);
            });
        API.get(
            'https://epassportservices.azurewebsites.net/Master/api/V1.0/Occupation/GetAll', config)
            .then((todo) => {
                setOccupationList(todo.data.occupations);
            })
            .catch((err) => {
                console.log('AXIOS ERROR: ', err.response);
            });
    }, []);
    return (
        <div class='container-md'>
            <MDBCard style={{ marginBottom: "1rem" }}>
                <MDBCardBody>
                    <form>
                        <div class='row'>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.firstName : null}
                                    name="firstName"
                                    className="form-control"
                                    onBlur={handleChange}
                                    type="text"
                                    label="First name"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.firstName == true && personalInfo.dataSaved == true) ? "First name " + isRequired : null}</span>
                            </div>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.middleName : null}
                                    name="middleName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="Middle name"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.middleName == true && personalInfo.dataSaved == true) ? "Middle name " + isRequired : null}</span>
                            </div>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.lastName : null}
                                    name="lastName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="Last name"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.lastName == true && personalInfo.dataSaved == true) ? "Last name " + isRequired : null}</span>
                            </div>
                            <div class="required-field col-md-3">
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
                                </MuiPickersUtilsProvider >
                                <span style={{ color: "red" }}> {(notCompleted.birthDate == true && personalInfo.dataSaved == true) ? "Birth date " + isRequired : null}</span>
                            </div>
                        </div>
                        <div class='row'>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.geezFirstName : null}
                                    name="geezFirstName"
                                    className="form-control"
                                    onBlur={handleChange}
                                    type="text"
                                    label="ስም"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.geezFirstName == true && personalInfo.dataSaved == true) ? "የአመልካቹ ስም አስፈላጊ ነው" : null}</span>
                            </div>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.geezMiddleName : null}
                                    name="geezMiddleName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="የአባት ስም"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.geezMiddleName == true && personalInfo.dataSaved == true) ? "የአባት ስም አስፈላጊ ነው" : null}</span>
                            </div>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.geezLastName : null}
                                    name="geezLastName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="የአያት ስም"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.geezLastName == true && personalInfo.dataSaved == true) ? "የአያት ስም አስፈላጊ ነው" : null}</span>
                            </div>
                            <div class="required-field col-md-3">
                                <div>
                                    <label>
                                        Nationality<i style={{ color: 'red' }}>*</i>{' '}
                                    </label>
                                    <select className="browser-default custom-select"
                                     name="nationalityId" 
                                     onChange={handleChange}>
                                        <option>select Nationality</option>
                                        {nationalityList.map((nationality) => (
                                            <option value={nationality.id} selected={nationality.code==="ET"} >{nationality.code}</option>
                                        ))}
                                    </select>
                                </div>
                                <span style={{ color: "red" }}> {(notCompleted.nationalityId == true && personalInfo.dataSaved == true) ? "Nationality " + isRequired : null}</span>
                            </div>
                        </div>

                        <div class='row'>
                        <div class="required-field col-md-3">
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.phoneNumber : null}
                                name="phoneNumber"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Phone Number"
                            />
                            <span style={{ color: "red" }}> {(notCompleted.phoneNumber == true && personalInfo.dataSaved == true) ? "Phone Number " + isRequired : null}</span>
                        </div>
                        <div class="required-field col-md-3">
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.email : null}
                                name="email"
                                className="form-control"
                                onBlur={handleChange}
                                type="email"
                                label="Email"
                            />
                            <span style={{ color: "red" }}> {(notCompleted.email == true && personalInfo.dataSaved == true) ? "Email " + isRequired : null}</span>
                        </div>                 
                        <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthPlace : null}
                                    name="birthPlace"
                                    className="form-control"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth Place"
                                />
                            </div>
                        <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthCirtificateNo : null}
                                    name="birthCertificatNo"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth Certificat No"
                                />
                            </div>
                        </div>

                        <div class='row'>
                            <div class="required-field col-md-3 mb-3">
                                <div>
                                    <label>
                                        Occupation<i style={{ color: 'red' }}>*</i>{' '}
                                    </label>
                                    <select className="browser-default custom-select" name="occupationId" onChange={handleChange}>
                                        <option>select Occupation</option>
                                        {occupationList.map((occupation) => (
                                            <option value={occupation.id}>{occupation.title}</option>
                                        ))}
                                    </select>
                                    <span style={{ color: "red" }}> {(notCompleted.occupationId == true && personalInfo.dataSaved == true) ? "Occupation " + isRequired : null}</span>
                                </div>
                            </div>
                            <div class="required-field col-md-3 mb-3">
                                <label>Hair Color</label>
                                <select className="browser-default custom-select" name="hairColor" onChange={handleChange}>
                                    <option value="Black">Black</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Blond">Blond</option>
                                    <option value="Auburn">Auburn</option>
                                    <option value="Red">Red</option>
                                    <option value="Grey">Grey</option>
                                    <option value="White">White</option>
                                </select>
                            </div>
                            <div class="required-field col-md-3 mb-3">
                                <label>Gender</label>
                                <select className="browser-default custom-select" name="gender" onChange={handleChange}>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div class="required-field col-md-3 mb-3">
                                <label>Martial status</label>
                                <select className="browser-default custom-select" name="martialStatus" onChange={handleChange}>
                                    <option value="">Select status</option>
                                    <option value="0">Single</option>
                                    <option value="1">Married</option>
                                    <option value="2">Divorced</option>
                                </select>
                            </div>
                        </div>

                        <div class='row'>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.height : null}
                                    name="height"
                                    onChange={handleChange}
                                    type="text"
                                    label="Height(cm)"
                                />
                            </div>
                            <div class="required-field col-md-3">
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.eyeColor : null}
                                    name="eyeColor"
                                    onChange={handleChange}
                                    type="text"
                                    label="Eye Color"
                                />
                            </div>
                            <div class="required-field col-md-3">
                                <label></label>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" defaultValue={prevInfo ? prevInfo.isHalfCast : false} name="isHalfCast" id="isHalfCast" onChange={(e) => handleCheck("isHalfCast", e.target.checked)} />
                                    <label class="custom-control-label" for="isHalfCast">Is Halfcast</label>
                                </div>
                            </div>
                            <div class="required-field col-md-3">
                                <label></label>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" name="isUnder18" id="isUnder18" onChange={(e) => handleCheck("isUnder18", e.target.checked)} />
                                    <label class="custom-control-label" for="isUnder18">Is Under 18</label>
                                </div>
                            </div>

                        </div>
                        <div class='row'>
                        <div class='col-md-6'>
                                <label></label>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" name="isAdoption" id="isAdoption" onChange={(e) => handleCheck("isAdoption", e.target.checked)} />
                                    <label class="custom-control-label" for="isAdoption">Is Adoption</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
});
export default PersonalInfo