import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';


const PersonalInfo = forwardRef((props, ref) => {

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        geezFirstName: "",
        geezMiddleName: "",
        geezLastName: "",
        birthCountry: "",
        birthCity: "",
        birthDate: "",
        gender: "1",
        height: "",
        eyeColor: "",
        hairColor: "",
        occupation: "",
        halfCast: "",
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
        birthCountry: true,
        birthCity: true,
        birthDate: true,
        gender: false,
        height: true,
        eyeColor: true,
        hairColor: true,
        occupation: true,
        halfCast: true,
        enrolmentDate: true,
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
                birthCountry: personalInfo.birthCountry === "" ? true : false,
                birthCity: personalInfo.birthCity === "" ? true : false,
                birthDate: personalInfo.birthDate === "" ? true : false,
                gender: personalInfo.gender === "" ? true : false,
                height: personalInfo.height === "" ? true : false,
                eyeColor: personalInfo.eyeColor === "" ? true : false,
                hairColor: personalInfo.hairColor === "" ? true : false,
                occupation: personalInfo.occupation === "" ? true : false,
                halfCast: personalInfo.halfCast === "" ? true : false,
                enrolmentDate: personalInfo.enrolmentDate === "" ? true : false,
                nationality: personalInfo.nationality === "" ? true : false
            })
            if (   notCompleted.firstName == true || notCompleted.lastName || notCompleted.middleName == true  
                || notCompleted.birthDate == true || notCompleted.geezFirstName == true || notCompleted.geezLastName
                || notCompleted.geezLastName == true || notCompleted.nationality == true || notCompleted.gender == true
                )
                return false;
            else
                return true
        }
    }));

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
            birthCountry: prevInfo ? prevInfo.birthCountry : "",
            birthCity: prevInfo ? prevInfo.birthCity : "",
            birthDate: prevInfo ? prevInfo.birthDate : "",
            height: prevInfo ? prevInfo.height : "",
            gender: prevInfo ? prevInfo.gender : "1",
            eyeColor: prevInfo ? prevInfo.eyeColor : "",
            hairColor: prevInfo ? prevInfo.hairColor : "",
            occupation: prevInfo ? prevInfo.occupation : "",
            halfCast: prevInfo ? prevInfo.halfCast : "",
            enrolmentDate: prevInfo ? prevInfo.enrolmentDate : "",
            nationality: prevInfo ? prevInfo.nationality : "",
        }))
    }, []);
    return (
        <MDBCard  style={{ marginBottom: "1rem" }}>
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
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.birthDate : null}
                                name="birthDate"
                                onChange={handleChange}
                                type="date"
                                label="Birth Date"
                            />
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
                                    valueDefault={prevInfo ? prevInfo.birthCountry : null}
                                    name="birthCountry"
                                    className="form-control"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth Country"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.birthCity : null}
                                    name="birthCity"
                                    onChange={handleChange}
                                    type="text"
                                    label="Birth City"
                                />
                            </MDBCol>
                            <MDBCol>
                                <label>Gender</label>
                                <select className="browser-default custom-select">
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.enrolmentDate : null}
                                    name="enrolmentDate"
                                    onChange={handleChange}
                                    type="date"
                                    label="Enrolment date"
                                />
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
                                    label="Height"
                                />
                            </MDBCol>
                            <MDBCol>
                            <MDBInput
                                    valueDefault={prevInfo ? prevInfo.halfCast : null}
                                    name="halfCast"
                                    onChange={handleChange}
                                    type="text"
                                    label="Half Cast"
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
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    valueDefault={prevInfo ? prevInfo.hairColor : null}
                                    name="hairColor"
                                    className="form-control"
                                    onChange={handleChange}
                                    type="text"
                                    label="Hair Color"
                                />
                            </MDBCol>
                            <MDBCol></MDBCol>
                            <MDBCol></MDBCol>
                        </MDBRow>
                    </form>
            </MDBCardBody>
        </MDBCard>
    );
});
export default PersonalInfo