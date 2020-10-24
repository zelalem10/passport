import React, { useState } from 'react';
import {
    MDBIcon,
    MDBContainer,
    MDBBtn,
    MDBInput,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from 'mdbreact';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import axios from 'axios';
import { useTranslation, Trans } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';

const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
        return UserToken;
    } else {
        const SystemToken = localStorage.systemToken;
        return SystemToken;
    }
};

const ContactUs = (props) => {
    const { t, i18n } = useTranslation();
    const accesstoken = tokenValue();

    let [firstName, setfirstName] = useState('');
    let [firstNameError, setfirstNameError] = useState('');
    let [lastName, setlastName] = useState('');
    let [lastNameError, setlastNameError] = useState('');
    let [phoneNumber, setphoneNumber] = useState('');
    let [phoneNumberError, setphoneNumberError] = useState('');
    let [email, setemail] = useState('');
    let [emailError, setemailError] = useState('');
    let [note, setnote] = useState('');
    let [noteError, setnoteError] = useState('');
    const [loading, setloading] = useState(false);
    const [Message, setMessage] = useState(false);
    const [data, setData] = useState({
        human: false,
        humanKey: '',
        ReCAPTCHAError: '',
    })
    const verifyCaptcha = (res) => {
        if (res) {
            setData({ human: true, humanKey: res });
        }
    };

    // ReCAPTCHA Expired
    const expireCaptcha = () => {
        setData({ human: false, humanKey: null });
    };
    const validate = () => {
        if (!data.human) {
            data.ReCAPTCHAError = 'Please verify you are human.';
        }
        if (!firstName) {
            firstNameError = 'First name is required.';
        } else firstNameError = '';

        if (!lastName) {
            lastNameError = 'Grand Father Name is required.';
        } else lastNameError = '';

        if (!phoneNumber) {
            phoneNumberError = 'Phone Number is required.';
        } else phoneNumberError = '';

        if (!email) {
            emailError = 'Email is required.';
        } else emailError = '';
        if (!note) {
            noteError = 'Message is required.';
        } else noteError = '';

        if (
            firstNameError ||
            lastNameError ||
            phoneNumberError ||
            emailError ||
            noteError
        ) {
            setfirstNameError(firstNameError);
            setemailError(emailError);
            setnoteError(noteError);
            setlastNameError(lastNameError);
            setphoneNumberError(phoneNumberError);
            return false;
        }

        return true;
    };
    const contactUsSubmit = (e) => {
        e.preventDefault();
        setfirstNameError('');
        setemailError('');
        setnoteError('');
        setlastNameError('');
        setphoneNumberError('');

        const isValid = validate();
        if (isValid) {
            setloading(true);
            axios({
                headers: { Authorization: `Bearer ` + accesstoken },
                method: 'post',
                url:
                    'https://epassportservicesaddt.azurewebsites.net/Transactional/api/V1.0/Feedback/Create',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    phonenumber: phoneNumber,
                    email: email,
                    feedbackNote: note,
                },
            })
                .then((response) => {
                    console.log(response);
                    setloading(false);
                    let status = response.data.status;
                    if (status == 1) {
                        setMessage(true);
                    }
                    setMessage(true);
                })
                .catch((error) => {
                    console.log(error);
                    setloading(false);
                });
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                    <MDBContainer
                        className="passport-card-deck passport-container my-3"
                        fluid
                    >

                        <div class="row">
                            <div class="col-lg-3 my-5">
                                <div class="card">
                                    <div class="card-body">
                                        <h4><Trans>contactUs.getInTouch</Trans></h4>
                                        <p>
                                            <Trans>contactUs.getInTouchDescription</Trans>
                                        </p>
                                        {/* <h4> <Trans>contactUs.addressTitle</Trans></h4>
                  <p> <Trans>contactUs.address</Trans></p> */}
                                        <h4><Trans>contactUs.EmailTitle</Trans></h4>
                                        <a href="mailto:support@ethiopianpassportservices.gov.et"><Trans>contactUs.Email</Trans></a>
                                        <h4><Trans>contactUs.phoneTitle</Trans></h4>
                                        <a href="tel:8133"><Trans>contactUs.freePhone</Trans></a>
                                        <h4><Trans>contactUs.socialMediaLink</Trans></h4>
                                        <div class="d-inline">
                                            <a href="https://www.facebook.com/FDRE-Immigration-Nationality-And-Vital-Events-Agency" className="fb-ic ePassprt-text-color">
                                                <MDBIcon fab icon="facebook-f" className="mr-2" />
                                                <p class="d-inline ePassprt-text-color">
                                                    <Trans>contactUs.facebook</Trans>
                                                </p>
                                            </a>
                                        </div>
                                        <br></br>
                                        <div class="d-inline">
                                            <a href="https://twitter.com/FdreINVEA" className="tw-ic ePassprt-text-color">
                                                <MDBIcon fab icon="twitter" className="mr-2" />
                                                <p class="d-inline ePassprt-text-color">
                                                    <Trans>contactUs.tiwtter</Trans>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 my-5">
                                <form onSubmit={contactUsSubmit}>
                                    <div class="card p-4">
                                        {Message && (
                                            <div class="alert alert-success text-center" role="alert">
                                                <Trans>contactUs.message</Trans>
                                            </div>
                                        )}
                                        <h3 class="text-center my-4">
                                            <Trans>contactUs.formTitle</Trans>
                                        </h3>
                                        <div class="row">
                                            <div class="col-md-6">
                                                {firstNameError ? (
                                                    <div className="red-text">{firstNameError}</div>
                                                ) : null}
                                                <div className="form-group">
                                                    <MDBInput
                                                        type="text"
                                                        label={t("contactUs.firstName")}
                                                        type="text"
                                                        outline
                                                        onChange={(e) => setfirstName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                {lastNameError ? (
                                                    <div className="red-text">{lastNameError}</div>
                                                ) : null}
                                                <div className="form-group">
                                                    <MDBInput
                                                        type="text"
                                                        type="text"
                                                        label={t("contactUs.lastName")}
                                                        outline
                                                        onChange={(e) => setlastName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                {phoneNumberError ? (
                                                    <div className="red-text">{phoneNumberError}</div>
                                                ) : null}
                                                <div className="form-group">
                                                    <MDBInput
                                                        type="text"
                                                        type="number"
                                                        label={t("contactUs.phoneNumber")}
                                                        outline
                                                        onChange={(e) => setphoneNumber(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                {emailError ? (
                                                    <div className="red-text">{emailError}</div>
                                                ) : null}
                                                <div className="form-group">
                                                    <MDBInput
                                                        type="text"
                                                        label={t("contactUs.email")}
                                                        type="email"
                                                        outline
                                                        onChange={(e) => setemail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                {noteError ? (
                                                    <div className="red-text">{noteError}</div>
                                                ) : null}
                                                <div className="form-group">
                                                    <MDBInput
                                                        type="textarea"
                                                        label={t("contactUs.remark")}
                                                        outline
                                                        onChange={(e) => setnote(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <ReCAPTCHA
                                                class="m-3"
                                                //prod
                                                sitekey="6Ld4CtkZAAAAAEiEoslw25wHdYBNkkRjQJrJ29KI"

                                                //local
                                                // sitekey="6Ld1odEZAAAAAC_M4JbsRXzapA5aSZXUd5ukXuBV"
                                                onChange={verifyCaptcha}
                                                onExpired={expireCaptcha}
                                            />
                                            {data.ReCAPTCHAError ? (
                                                <div className="red-text ml-5">
                                                    {data.ReCAPTCHAError}
                                                </div>
                                            ) : null}
                                            <div class="col-12 medium text-center">
                                                <MDBBtn type="submit" class="btn btnBlu">
                                                    <Trans>contactUs.submit</Trans>
                                                </MDBBtn>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-3 my-5">
                                <MDBTable>
                                    <thead class="thead-lightt">
                                        <tr>
                                            <th> <Trans>contactUs.brach</Trans> </th>
                                            <th> <Trans>contactUs.phoneNumber</Trans>  </th>
                                            <th> <Trans>contactUs.faxNumber</Trans></th>
                                        </tr>
                                    </thead>
                                    <MDBTableBody>
                                        <tr>
                                            <td> <Trans>contactUs.bahrdar</Trans></td>
                                            <td>0582263730</td>
                                            <td>0582264022</td>
                                        </tr>
                                        <tr>
                                            <td>  <Trans>contactUs.mekelle</Trans></td>
                                            <td>0344416772</td>
                                            <td>0344409291</td>
                                        </tr>
                                        <tr>
                                            <td> <Trans>contactUs.dessie</Trans></td>
                                            <td>0331122581</td>
                                            <td>0331123837</td>
                                        </tr>
                                        <tr>
                                            <td> <Trans>contactUs.semera</Trans></td>
                                            <td>0333662077</td>
                                            <td>0336660282</td>
                                        </tr>
                                        <tr>
                                            <td><Trans>contactUs.diredawa</Trans></td>
                                            <td>0251112497</td>
                                            <td>0251117880</td>
                                        </tr>
                                        <tr>
                                            <td><Trans>contactUs.adama</Trans></td>
                                            <td>0222126637</td>
                                            <td>0222128463</td>
                                        </tr>
                                        <tr>
                                            <td><Trans>contactUs.jigjiga</Trans></td>
                                            <td>----------</td>
                                            <td>0252782038</td>
                                        </tr>
                                        <tr>
                                            <td><Trans>contactUs.hawasa</Trans></td>
                                            <td>0462214223</td>
                                            <td>0462213143</td>
                                        </tr>
                                        <tr>
                                            <td><Trans>contactUs.jimma</Trans></td>
                                            <td>0471116745</td>
                                            <td>0471121228</td>
                                        </tr>
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                    </MDBContainer>
                )}
        </div>
    );
};

export default ContactUs;
