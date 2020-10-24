import React, {

    useEffect,

    useState,

    useImperativeHandle,

    forwardRef,

} from 'react';

import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';

import { useDispatch, useSelector } from 'react-redux';

import addAddressInfo from '../../redux/actions/addAddressInfoAction';

import API from '../Utils/API';
import { useTranslation, Trans } from 'react-i18next';


const Address = forwardRef((props, ref) => {
    const { t, i18n } = useTranslation();
    const [addressInfo, setAddressInfo] = useState({

        region: '',

        city: '',

        state: '',

        zone: '',

        woreda: '',

        kebele: '',

        street: '',

        houseNo: '',

        poBox: '',

        requestPlace: '',

        dataSaved: false,

        formCompleted: false,

    });

    const [notCompleted, setNotCompleted] = useState({

        region: true,

        city: true,

        state: true,

        zone: true,

        woreda: true,

        kebele: true,

        street: true,

        houseNo: true,

        poBox: true,

        phoneNumber: true,

    });

    const tokenValue = () => {
        const UserToken = localStorage.userToken;

        if (UserToken) {
            return UserToken;
        } else {
            const SystemToken = localStorage.systemToken;
            return SystemToken;
        }
    };

    const [regionList, setRegionList] = useState([]);

    const dispatch = useDispatch();

    const counter = useSelector((state) => state);

    const accesstoken = tokenValue();

    const usertoken = localStorage.userToken;

    const config = {

        headers: { Authorization: 'Bearer ' + accesstoken },

    };

    useImperativeHandle(ref, () => ({

        saveData() {

            setAddressInfo((prevState) => ({

                ...prevState,

                dataSaved: true,

            }));

            dispatch(addAddressInfo(addressInfo));

        },

        Validate() {

            if (notCompleted.region == true || notCompleted.city == true)

                return false;

            else return true;

        },

    }));

    const handleChange = (event) => {

        const { name, value } = event.target;

        setAddressInfo((prevState) => ({

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

        // dispatch(addAddressInfo(addressInfo));

    };

    var prevInfo = counter.address[counter.address.length - 1];

    const isRequired = 'is required!';

    if (prevInfo !== null && typeof prevInfo !== 'undefined') {

        if (addressInfo.formCompleted === false) {

            setAddressInfo((prevState) => ({

                ...prevState,

                region: prevInfo.region,

                city: prevInfo.city,

                state: prevInfo.state,

                zone: prevInfo.zone,

                woreda: prevInfo.woreda,

                street: prevInfo.street,

                houseNo: prevInfo.houseNo,

                poBox: prevInfo.poBox,

                requestPlace: prevInfo.requestPlace,

                formCompleted: true,

            }));

        }

    }

    useEffect(() => {

        setNotCompleted({

            region: addressInfo.region === '' ? true : false,

            city: addressInfo.city === '' ? true : false,

            state: addressInfo.state === '' ? true : false,

            zone: addressInfo.zone === '' ? true : false,

            woreda: addressInfo.woreda === '' ? true : false,

            kebele: addressInfo.kebele === '' ? true : false,

            street: addressInfo.street === '' ? true : false,

            houseNo: addressInfo.houseNo === '' ? true : false,

            poBox: addressInfo.poBox === '' ? true : false,

            requestPlace: addressInfo.requestPlace === '' ? true : false,

        });

        setRegionList(JSON.parse(localStorage.countryRegions))

        if (regionList.length === 0) {

            API.get('https://epassportservicesaddt.azurewebsites.net/Master/api/V1.0/CountryRegion/GetAll', config)

                .then((todo) => {

                    setRegionList(todo.data.countryRegions);

                })

                .catch((err) => {

                    console.log('AXIOS ERROR: ', err.response);

                });

        }



    }, []);

    return (

        <MDBCard>

            <MDBCardBody>

                <form>

                    <MDBRow>

                        <MDBCol md="3" className="required-field">

                            <div>

                                <label>

                                    {t('requestForm.region')}<i style={{ color: 'red' }}>*</i>{' '}

                                </label>

                                <select

                                    className="browser-default custom-select"

                                    name="region"

                                    onChange={handleChange}

                                >

                                    <option>Select region</option>

                                    {regionList.map((region) => (

                                        <option value={region.name} selected={prevInfo != null && (region.name === prevInfo.region)}>{region.name}</option>

                                    ))}

                                </select>

                            </div>

                            <span style={{ color: 'red' }}>

                                {' '}

                                {notCompleted.region == true && addressInfo.dataSaved == true

                                    ? 'Region ' + isRequired

                                    : null}

                            </span>{' '}

                        </MDBCol>



                        <MDBCol md="3" className="required-field">

                            <MDBInput

                                valueDefault={prevInfo ? prevInfo.city : null}

                                name="city"

                                className="form-control"

                                onBlur={handleChange}

                                type="text"

                                label={t('requestForm.city')}

                            />

                            <span style={{ color: 'red' }}>

                                {' '}

                                {notCompleted.city == true && addressInfo.dataSaved == true

                                    ? 'City ' + isRequired

                                    : null}

                            </span>

                        </MDBCol>

                        <MDBCol md="3">

                            <MDBInput

                                valueDefault={prevInfo ? prevInfo.state : null}

                                name="state"

                                className="form-control"

                                onBlur={handleChange}

                                type="text"

                                label={t('requestForm.State')}

                            />

                        </MDBCol>

                        <MDBCol md="3">

                            <MDBInput

                                valueDefault={prevInfo ? prevInfo.zone : null}

                                name="zone"

                                className="form-control"

                                onBlur={handleChange}

                                type="text"

                                label={t('requestForm.zone')}

                            />

                        </MDBCol>

                    </MDBRow>

                    <MDBRow>

                        <MDBCol md="3">
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.woreda : null}
                                name="woreda"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Woreda"
                            />
                        </MDBCol>

                        <MDBCol md="3">

                            <MDBInput

                                valueDefault={prevInfo ? prevInfo.kebele : null}

                                name="kebele"

                                className="form-control"

                                onBlur={handleChange}

                                type="text"

                                label={t('requestForm.kebele')}

                            />

                        </MDBCol>

                        <MDBCol md="3">

                            <MDBInput

                                valueDefault={prevInfo ? prevInfo.street : null}

                                name="street"

                                className="form-control"

                                onBlur={handleChange}

                                type="text"

                                label={t('requestForm.street')}

                            />

                        </MDBCol>

                        <MDBCol md="3">

                            <MDBInput

                                valueDefault={prevInfo ? prevInfo.houseNo : null}

                                name="houseNo"

                                className="form-control"

                                onBlur={handleChange}

                                type="text"

                                label={t('requestForm.houseNo')}

                            />

                        </MDBCol>

                    </MDBRow>

                    <MDBRow>

                        <MDBCol md="3">

                            <MDBInput

                                valueDefault={prevInfo ? prevInfo.poBox : null}

                                name="poBox"

                                className="form-control"

                                onBlur={handleChange}

                                type="text"

                                label={t('requestForm.poBox')}

                            />

                        </MDBCol>


                    </MDBRow>

                </form>

            </MDBCardBody>

        </MDBCard>

    );

});



export default Address;