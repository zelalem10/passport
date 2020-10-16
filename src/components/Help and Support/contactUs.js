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

const ContactUs = (props) => {
  const { t, i18n } = useTranslation();
  const accesstoken = localStorage.systemToken;

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

  const validate = () => {
    if (!firstName) {
      firstNameError = 'First name is required.';
    } else firstNameError = '';

    if (!lastName) {
      lastNameError = 'Last Name is required.';
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
          'https://epassportservices.azurewebsites.net/Transactional/api/V1.0/Feedback/Create',
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
              <div class="card p-2">
                <div class="card-body">
                  <h4>Get In Touch</h4>
                  <p>
                  Ethiopian Passport Online Passport Service
                  </p>
                  <h4>Address</h4>
                  <p>Main Office Address</p>
                  <h4>Email</h4>
                  <a href="mailto:support@ethiopianpassportservices.gov.et">support@ethiopianpassportservices.gov.et </a>
                  <h4>Phone</h4>
                  <a href="tel:8133">8133 FREE CALL</a>
                  <h4>Social Media Link</h4>
                  <div class="d-inline">
                    <Link to="#!" className="fb-ic ePassprt-text-color">
                      <MDBIcon fab icon="facebook-f" className="mr-2" />
                      <p class="d-inline ePassprt-text-color">
                        FDRE Immigration Nationality and Vital Events Agency
                      </p>
                    </Link>
                  </div>
                  <br></br>
                  <div class="d-inline">
                    <Link to="#!" className="tw-ic ePassprt-text-color">
                      <MDBIcon fab icon="twitter" className="mr-2" />
                      <p class="d-inline ePassprt-text-color">
                        Immigration Nationality and Vital Event Agency
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 my-5">
              <form onSubmit={contactUsSubmit}>
                <div class="card p-4">
                  {Message && (
                    <div class="alert alert-success text-center" role="alert">
                      Thank You For Your Feedback!
                    </div>
                  )}
                  <h3 class="text-center my-4">
                    Please fill out this form to contact us
                  </h3>
                  <div class="row">
                    <div class="col-md-6">
                      {firstNameError ? (
                        <div className="red-text">{firstNameError}</div>
                      ) : null}
                      <div className="form-group">
                        <MDBInput
                          type="text"
                          label="Firs Name"
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
                          label="Last Name"
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
                          label="Phone Number"
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
                          label="Your e-mail"
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
                          label="Please Write Your Message Here"
                          outline
                          onChange={(e) => setnote(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col-12 medium text-center">
                      <MDBBtn type="submit" class="btn btnBlu">
                        Submit
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
                    <th>Brach Office name</th>
                    <th>Phone number </th>
                    <th>FAX Number</th>
                  </tr>
                </thead>
                <MDBTableBody>
                  <tr>
                    <td>Bahrdar</td>
                    <td>0582263730</td>
                    <td>0582264022</td>
                  </tr>
                  <tr>
                    <td>Mekelle </td>
                    <td>0344416772</td>
                    <td>0344409291</td>
                  </tr>
                  <tr>
                    <td>Dessie</td>
                    <td>0331122581</td>
                    <td>0331123837</td>
                  </tr>
                  <tr>
                    <td>Semera</td>
                    <td>0333662077</td>
                    <td>0336660282</td>
                  </tr>
                  <tr>
                    <td>Diredawa</td>
                    <td>0251112497</td>
                    <td>0251117880</td>
                  </tr>
                  <tr>
                    <td>Adama</td>
                    <td>0222126637</td>
                    <td>0222128463</td>
                  </tr>
                  <tr>
                    <td>Jigjiga</td>
                    <td>----------</td>
                    <td>0252782038</td>
                  </tr>
                  <tr>
                    <td>Hawasa</td>
                    <td>0462214223</td>
                    <td>0462213143</td>
                  </tr>
                  <tr>
                    <td>Jimma</td>
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
