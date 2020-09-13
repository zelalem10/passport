
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addAddressInfo from '../../redux/actions/addAddressInfoAction';

const Address = forwardRef((props, ref) => {
    const [addressInfo, setAddressInfo] = useState({
        applicantNumber: props.applicantNumber,
        country: "",
        city: "",
        state: "",
        zone: "",
        woreda: "",
        street: "",
        houseNo: "",
        poBox: "",
        phoneNumber: "",
        email: "",
        requestPlace: "",
        dataSaved: false
    });
    const [notCompleted, setNotCompleted] = useState({
        country: true,
        city: true,
        state: true,
        zone: true,
        woreda: true,
        street: true,
        houseNo: true,
        poBox: true,
        phoneNumber: true,
        email: true,
        requestPlace: true
    });
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    if (counter.address.length === 0) {
        dispatch(addAddressInfo(addressInfo));
    }
    useImperativeHandle(ref, () => ({
        saveData() {
            setAddressInfo((prevState) => ({
                ...prevState,
                dataSaved: true,
            }));
            dispatch(addAddressInfo(addressInfo));
        },
        Validate() {
            setNotCompleted({
                country: addressInfo.country==="" ? true: false,
                city: addressInfo.city==="" ? true: false,
                state: addressInfo.state==="" ? true: false,
                zone: addressInfo.zone==="" ? true: false,
                woreda: addressInfo.woreda==="" ? true: false,
                street: addressInfo.street==="" ? true: false,
                houseNo: addressInfo.houseNo==="" ? true: false,
                poBox: addressInfo.poBox==="" ? true: false,
                phoneNumber: addressInfo.phoneNumber==="" ? true: false,
                email: addressInfo.email==="" ? true: false,
                requestPlace: addressInfo.requestPlace==="" ? true: false,})
            if (notCompleted.country == true || notCompleted.city == true || notCompleted.phoneNumber == true)
            return false
            else
             return true
        }
    }));
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddressInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        if (value != "") {
            setNotCompleted((prevState) => ({
                ...prevState,
                [name]: false,
            }))
        }
        dispatch(addAddressInfo(addressInfo));

    }
    const resultLength=counter.address.filter(item => item.applicantNumber == props.applicantNumber).length;
    var prevInfo = counter.address.filter(item => item.applicantNumber == props.applicantNumber)[resultLength-1]
    const isRequired = "is required!"
    useEffect(() => {
        setAddressInfo((prevState) => ({
            ...prevState,
            country: prevInfo ? prevInfo.country : "",
            city: prevInfo ? prevInfo.city : "",
            state: prevInfo ? prevInfo.state : "",
            zone: prevInfo ? prevInfo.zone : "",
            woreda: prevInfo ? prevInfo.woreda : "",
            street: prevInfo ? prevInfo.street : "",
            houseNo: prevInfo ? prevInfo.houseNo : "",
            poBox: prevInfo ? prevInfo.poBox : "",
            phoneNumber: prevInfo ? prevInfo.phoneNumber : "",
            email: prevInfo ? prevInfo.email : "",
            requestPlace: prevInfo ? prevInfo.requestPlace : "",
        }))
    }, []);
    return (
                <form >
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.country : null}
                                name="country"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Country"
                            />
                            <span style={{ color: "red" }}> {(notCompleted.country == true && addressInfo.dataSaved == true) ? "Country" + isRequired : null}</span>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.city : null}
                                name="city"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="City"
                            />
                            <span style={{ color: "red" }}> {(notCompleted.city == true && addressInfo.dataSaved == true) ? "City " + isRequired : null}</span>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.state : null}
                                name="state"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="State"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.zone : null}
                                name="zone"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Zone"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.woreda : null}
                                name="woreda"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Woreda"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.street : null}
                                name="street"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Street"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.houseNo : null}
                                name="houseNo"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="House No."
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.poBox : null}
                                name="poBox"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Po. Box"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.phoneNumber : null}
                                name="phoneNumber"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Phone Number"
                            />
                            <span style={{ color: "red" }}> {(notCompleted.phoneNumber == true && addressInfo.dataSaved == true) ? "Phone Number " + isRequired : null}</span>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.email : null}
                                name="email"
                                className="form-control"
                                onBlur={handleChange}
                                type="email"
                                label="Email"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.requestPlace : null}
                                name="requestPlace"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Request Place"
                            />
                        </MDBCol>
                    </MDBRow>
                </form>
     );
});

export default Address