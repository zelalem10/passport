import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBContainer } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import alertResponse from '../common/AlertResponse'

const PersonalInfo = forwardRef((props, ref) => {
    const [nationalityList, setNationalityList] = useState([])
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
        occupation: "",
        isHalfCast: false,
        isUnder18: false,
        isAdoption: false,
        enrolmentDate: "",
        nationality: "",
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
        occupation: true,
        isHalfCast: true,
        isUnder18: true,
        isAdoption: true,
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
                occupation: personalInfo.occupation === "" ? true : false,
                isHalfCast: personalInfo.isHalfCast,
                isUnder18: personalInfo.isUnder18,
                isAdoption: personalInfo.isAdoption,
                enrolmentDate: personalInfo.enrolmentDate === "" ? true : false,
                nationality: personalInfo.nationality === "" ? true : false,
                martialStatus: personalInfo.martialStatus === "" ? true : false
            })
            if (notCompleted.firstName == true || notCompleted.lastName || notCompleted.middleName == true
                || notCompleted.birthDate == true || notCompleted.geezFirstName == true || notCompleted.geezLastName
                || notCompleted.geezLastName == true || notCompleted.nationality == true || notCompleted.gender == true
            )
                return false;
            else
                return true
        }
    }));
    const [selectedDate, setSelectedDate] = React.useState(
        new Date(prevInfo ? prevInfo.dateOfBirth : new Date())
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
    const handleCheck = (name, checked) => {
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: checked,
        }))
        // if (!event.target.checked) {
        //     setNotCompleted((prevState) => ({
        //         ...prevState,
        //         [name]: false,
        //     }))
        // }
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
            occupation: prevInfo ? prevInfo.occupation : "",
            isHalfCast: prevInfo ? prevInfo.isHalfCast : false,
            isAdoption: prevInfo ? prevInfo.isAdoption : false,
            isUnder18: prevInfo ? prevInfo.isUnder18 : false,
            enrolmentDate: prevInfo ? prevInfo.enrolmentDate : "",
            nationality: prevInfo ? prevInfo.nationality : "",
        }))
    }, []);
    return (
        <MDBContainer>
            <MDBCard style={{ marginBottom: "1rem" }}>
                <MDBCardBody>
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
                            <MDBCol className="date-picker">
                                {/* <MDBInput
                                valueDefault={prevInfo ? prevInfo.birthDate : null}
                                name="birthDate"
                                onChange={handleChange}
                                type="date"
                                label="Birth Date"
                            /> */}
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
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.geezFirstName : null}
                                    name="geezFirstName"
                                    className="form-control"
                                    onBlur={handleChange}
                                    type="text"
                                    label="ስም"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.geezFirstName == true && personalInfo.dataSaved == true) ? "የአመልካቹ ስም አስፈላጊ ነው" : null}</span>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.geezMiddleName : null}
                                    name="geezMiddleName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="የአባት ስም"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.geezMiddleName == true && personalInfo.dataSaved == true) ? "የአባት ስም አስፈላጊ ነው" : null}</span>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.geezLastName : null}
                                    name="geezLastName"
                                    onBlur={handleChange}
                                    type="text"
                                    label="የአያት ስም"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.geezLastName == true && personalInfo.dataSaved == true) ? "የአያት ስም አስፈላጊ ነው" : null}</span>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.nationality : null}
                                    name="nationality"
                                    onChange={handleChange}
                                    type="text"
                                    label="Nationality"
                                />
                                <span style={{ color: "red" }}> {(notCompleted.nationality == true && personalInfo.dataSaved == true) ? "Nationality" + isRequired : null}</span>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthPlace : null}
                                    name="birthPlace"
                                    className="form-control"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth Place"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthCirtificateNo : null}
                                    name="birthCertificatNo"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth Certificat No"
                                />
                            </MDBCol>
                            <MDBCol>
                                <label>Gender</label>
                                <select className="browser-default custom-select" name="gender" onChange={handleChange}>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </MDBCol>
                            <MDBCol className="date-picker">
                                {/* <MDBInput
                                valueDefault={prevInfo ? prevInfo.enrolmentDate : null}
                                name="enrolmentDate"
                                onChange={handleChange}
                                type="date"
                                label="Enrollment date"
                            /> */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                </MuiPickersUtilsProvider >
                                {/* <span style={{ color: "red" }}> {(notCompleted.enrolmentDate == true && personalInfo.dataSaved == true) ? "Enrollment date " + isRequired : null}</span> */}
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
                                    label="Height(cm)"
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
                            <MDBCol>
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
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <label>Martial status</label>
                                <select className="browser-default custom-select" name="martialStatus" onChange={handleChange}>
                                    <option value="">Select status</option>
                                    <option value="0">Single</option>
                                    <option value="1">Married</option>
                                    <option value="2">Divorced</option>
                                </select>
                            </MDBCol>
                            <MDBCol>
                                <label></label>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" defaultValue={prevInfo ? prevInfo.isHalfCast : false} name="isHalfCast" id="isHalfCast" onChange={(e) => handleCheck("isHalfCast", e.target.checked)} />
                                    <label class="custom-control-label" for="isHalfCast">Is Halfcast</label>
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <label></label>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" name="isUnder18" id="isUnder18" onChange={(e) => handleCheck("isUnder18", e.target.checked)} />
                                    <label class="custom-control-label" for="isUnder18">Is Under 18</label>
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <label></label>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" name="isAdoption" id="isAdoption" onChange={(e) => handleCheck("isAdoption", e.target.checked)} />
                                    <label class="custom-control-label" for="isAdoption">Is Adoption</label>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
});
export default PersonalInfo