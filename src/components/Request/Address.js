
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addAddressInfo from '../../redux/actions/addAddressInfoAction';
import API from '../Utils/API';


const Address = forwardRef((props, ref) => {
    const [addressInfo, setAddressInfo] = useState({
        country: "",
        city: "",
        state: "",
        zone: "",
        woreda: "",
        street: "",
        houseNo: "",
        poBox: "",
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
        phoneNumber: true
    });
    const [countryList, setCountryList]=useState([]);
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    const accesstoken = localStorage.systemToken;
    const usertoken = localStorage.userToken;
    const config = {
        headers: { Authorization: 'Bearer ' + accesstoken },
    };
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
                country: addressInfo.country === "" ? true : false,
                city: addressInfo.city === "" ? true : false,
                state: addressInfo.state === "" ? true : false,
                zone: addressInfo.zone === "" ? true : false,
                woreda: addressInfo.woreda === "" ? true : false,
                street: addressInfo.street === "" ? true : false,
                houseNo: addressInfo.houseNo === "" ? true : false,
                poBox: addressInfo.poBox === "" ? true : false,
                requestPlace: addressInfo.requestPlace === "" ? true : false,
            })
            if (notCompleted.country == true || notCompleted.city == true)
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
    var prevInfo = counter.address[counter.address.length - 1]
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
            requestPlace: prevInfo ? prevInfo.requestPlace : "",
        }))

        API.get(
            'https://epassportservices.azurewebsites.net/Master/api/V1.0/Country/GetAll', config)
            .then((todo) => {
                setCountryList(todo.data.countrys);
            })
    }, []);
    return (
        <MDBCard>
            <MDBCardBody>
                <form >
                    <MDBRow>
                        {/* <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.country : null}
                                name="country"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Country"
                            />
                            <span style={{ color: "red" }}> {(notCompleted.country == true && addressInfo.dataSaved == true) ? "Country" + isRequired : null}</span>
                        </MDBCol> */}

                        <MDBCol className="required-field">
                <div>
                  <label>
                    Country<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select className="browser-default custom-select" name="country" onChange={handleChange}>
                    <option>select country</option>
                    {countryList.map((country) => (
                      <option value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.country == true &&
                    addressInfo.dataSaved == true
                    ? 'Country ' + isRequired
                    : null}
                </span>                            </MDBCol>
              
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
                                valueDefault={prevInfo ? prevInfo.requestPlace : null}
                                name="requestPlace"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Request Place"
                            />
                        </MDBCol>
                        <MDBCol></MDBCol>
                        <MDBCol></MDBCol>
                        <MDBCol></MDBCol>
                    </MDBRow>
                </form>
            </MDBCardBody>
        </MDBCard>
    );
});

export default Address