import React, { Component } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from 'mdbreact';
import { Translation, useTranslation, Trans, withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
const Errorstyle = {
  marginTop: '-2rem',
  marginLeft: '2.5rem',
};
const accesstoken = localStorage.systemToken;

// intial state
const intialState = {
  personRequest: {
    firstName: '',
    middleName: '',
    lastName: '',
    firstNameError: '',
    MiddleNameError: '',
    lastNameError: '',
    email: '',
    password: '',
    passwordTwo: '',
    emailError: '',
    passwordError: '',
    passwordTwoError: '',
    phoneNumber: '',
    ReCAPTCHAError: '',
  },
  human: false,
  phoneNumberError: '',
  internalErrorMessage: ''
};

class SignUp extends Component {
  state = intialState;


  redirectToLogIn = () => {
    const { history } = this.props;
    if(history) history.push('/signIn');
   }

   redirectToSignUp = () => {
    const { history } = this.props;
    if(history) history.push('/signUp');
   }
  // ReCAPTCHA Client Side

  // ReCAPTCHA verify
  verifyCaptcha = (res) => {
    console.log('Captcha loaded.');
    if (res) {
      this.setState({ human: true, humanKey: res });
    }
  };

  // ReCAPTCHA Expired
  expireCaptcha = () => {
    this.setState({ human: false, humanKey: null });
  };

  //validate form
  validate = () => {
    let firstNameError = '';
    let MiddleNameError = '';
    let lastNameError = '';
    let emailError = '';
    let passwordError = '';
    let passwordTwoError = '';
    let phoneNumberError = '';
    let ReCAPTCHAError = '';

    if (this.state.human == false) {
      ReCAPTCHAError = 'Please verify you are human.';
    }

    if (!this.state.personRequest.firstName) {
      firstNameError = 'First name is required.';
    }
    if (!this.state.personRequest.middleName) {
      MiddleNameError = 'Father Name is required.';
    }

    if (!this.state.personRequest.lastName) {
      lastNameError = 'Grand Father Name is required.';
    }
    if (!this.state.personRequest.phoneNumber) {
      phoneNumberError = 'Phone Number is required.';
    }
    if (!this.state.personRequest.email) {
      emailError = 'Email Address is required.';
    }
    if (!this.state.personRequest.password) {
      passwordError = 'Password is required.';
    } else if (this.state.personRequest.password.length < 6) {
      passwordError = 'At Least 6 Charachter is required.';
    }
    if (!this.state.personRequest.passwordTwo) {
      passwordTwoError = 'Password is required.';
    } else if (this.state.personRequest.passwordTwo.length < 6) {
      passwordTwoError = 'At least 6 charachter is required.';
    } else if (
      this.state.personRequest.password !== this.state.personRequest.passwordTwo
    ) {
      passwordTwoError = 'Passwords Do Not Match.';
    }

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      passwordTwoError ||
      phoneNumberError ||
      ReCAPTCHAError
    ) {
      this.setState({
        firstNameError,
        MiddleNameError,
        lastNameError,
        emailError,
        passwordError,
        passwordTwoError,
        phoneNumberError,
        ReCAPTCHAError,
      });

      return false;
    }

    return true;
  };

  changeHandler = (e) => {
    const { personRequest } = { ...this.state };
    const personRequestState = personRequest;
    const { name, value } = e.target;
    personRequestState[name] = value;

    this.setState({ personRequest: personRequestState });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const isValid = this.validate();
    if (isValid) {
      axios({
        headers: { Authorization: `Bearer ` + accesstoken },
        method: 'post',
        url:
          'https://epassportservicesaddt.azurewebsites.net/api/Register/V1.0/UserRegistration/RegisterUser',
        data: this.state,
      })
        .then((Response) => {
          console.log(Response);
        
          this.redirectToLogIn();
        })
        .catch((err) => {
          debugger;
          console.log(err);
           this.state.internalErrorMessage = err.response.data.message;
           this.redirectToSignUp()
        });

      // clear form
      this.setState(intialState.personRequest);
    }
  };

  render() {
    const { personRequest } = this.state;
    const { history } = this.props;
    return (
      <MDBContainer
        className="passport-card-deck passport-container my-3 p-5"
        fluid
      >
        {/* <div class="alert alert-success" role="alert">
          Your request is success!
        </div>
        <div class="alert alert-danger" role="alert">
          your request is fail!
        </div> */}
        <MDBRow className="noShadow">
          <MDBCol lg="7" className="mr-3">
            <MDBCard>
              <MDBCardBody>
                <form className="SignUp" onSubmit={this.submitHandler}>
                  <div className="header pt-3 mb-5 textBackground">
                    <MDBRow className="d-flex justify-content-center white-text">
                      <h4 className="white-text my-3 py-3 font-weight-bold">
                        <span class="fa fa-user-plus mr-2"></span>
                        <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.title')}</span>
                          }
                        </Translation>
                      </h4>
                    </MDBRow>
                    
                  </div>

                  <div className="grey-text">
                 { this.state.internalErrorMessage? <h5 class="text-danger text-center">{this.state.internalErrorMessage}</h5> : null}
                    <div class="row">
                      <div class="col-md-6">

                        <MDBInput
                          label={
                            <Translation>
                              {
                                (t, { i18n }) => <p>{t('requestForm.firstname')}</p>
                              }
                            </Translation>
                          }
                          name="firstName"
                          value={personRequest.firstName}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.changeHandler}
                        />
                        {this.state.firstNameError ? (
                          <div className="red-text" style={Errorstyle}>
                            {this.state.firstNameError}
                          </div>
                        ) : null}
                      </div>
                      <div class="col-md-6">
                        <MDBInput
                          label={
                            <Translation>
                              {
                                (t, { i18n }) => <p>{t('requestForm.middleName')}</p>
                              }
                            </Translation>
                          }
                          name="middleName"
                          value={personRequest.middleName}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.changeHandler}
                        />
                        {this.state.MiddleNameError ? (
                          <div className="red-text" style={Errorstyle}>
                            {this.state.MiddleNameError}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <MDBInput
                          label={
                            <Translation>
                              {
                                (t, { i18n }) => <p>{t('requestForm.lastName')}</p>
                              }
                            </Translation>
                          }
                          name="lastName"
                          value={personRequest.lastName}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.changeHandler}
                        />
                        {this.state.lastNameError ? (
                          <div className="red-text" style={Errorstyle}>
                            {this.state.lastNameError}
                          </div>
                        ) : null}
                      </div>
                      <div class="col-md-6">
                        <MDBInput
                          label={
                            <Translation>
                              {
                                (t, { i18n }) => <span>{t('requestForm.phoneNumber')}</span>
                              }
                            </Translation>}
                          name="phoneNumber"
                          value={personRequest.phoneNumber}
                          icon="phone"
                          group
                          type="number"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.changeHandler}
                        />
                        {this.state.phoneNumberError ? (
                          <div className="red-text" style={Errorstyle}>
                            {this.state.phoneNumberError}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <MDBInput
                          label={
                            <Translation>
                              {
                                (t, { i18n }) => <span>{t('requestForm.email')}</span>
                              }
                            </Translation>}
                          icon="envelope"
                          name="email"
                          value={personRequest.email}
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.changeHandler}
                        />
                        {this.state.emailError ? (
                          <div className="red-text" style={Errorstyle}>
                            {this.state.emailError}
                          </div>
                        ) : null}
                      </div>
                      <div class="col-md-6">
                        <MDBInput
                          label={
                            <Translation>
                              {
                                (t, { i18n }) => <span>{t('register.password')}</span>
                              }
                            </Translation>}
                          icon="lock"
                          password={personRequest.password}
                          name="password"
                          group
                          type="password"
                          validate
                          onChange={this.changeHandler}
                        />
                        {this.state.passwordError ? (
                          <div className="red-text" style={Errorstyle}>
                            {this.state.passwordError}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <MDBInput
                          label={
                            <Translation>
                              {
                                (t, { i18n }) => <span>{t('register.comfirmPassword')}</span>
                              }
                            </Translation>}
                          icon="lock"
                          password={personRequest.passwordTwo}
                          name="passwordTwo"
                          group
                          type="password"
                          validate
                          onChange={this.changeHandler}
                        />
                        {this.state.passwordTwoError ? (
                          <div className="red-text" style={Errorstyle}>
                            {this.state.passwordTwoError}
                          </div>
                        ) : null}
                      </div>
                      <div class="col-md-6">
                        <ReCAPTCHA
                          class="my-2"
                          //prod
                          sitekey="6Ld4CtkZAAAAAEiEoslw25wHdYBNkkRjQJrJ29KI"

                          //local
                          // sitekey="6Ld1odEZAAAAAC_M4JbsRXzapA5aSZXUd5ukXuBV"
                          onChange={this.verifyCaptcha}
                          onExpired={this.expireCaptcha}
                        />
                        {this.state.ReCAPTCHAError ? (
                          <div className="red-text ml-5">
                            {this.state.ReCAPTCHAError}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <MDBRow className="d-flex align-items-center my-3 signUpbutton">
                    <MDBCol md="6" className="text-center my-2">
                      <MDBBtn
                        className="z-depth-1 btn-info"
                        type="submit"
                        rounded
                        block
                      >
                        <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.signUp')}</span>
                          }
                        </Translation> <i class="fas fa-sign-in-alt pl-1"></i>
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="6">
                      <p className="font-medium grey-text d-flex justify-content-end">
                        <Link
                          to="/signIn"
                          color="cyan"
                          className="blue-text mr-1"
                        >
                          <Translation>
                            {
                              (t, { i18n }) => <span>{t('register.logIn')}</span>
                            }
                          </Translation>
                        </Link>

                        <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.alreadyRegistered')}</span>
                          }
                        </Translation>
                      </p>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="4">
            <div class="card p-2">
              <div class="card-body">
                <div class="u-center-text u-margin-bottom-big">
                  <h1 class="heading-secondary">
                  <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.memberBenefit')}</span>
                          }
                  </Translation>
                 </h1>
                </div>
                <h4>
                <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.membersGetMore')}</span>
                          }
                  </Translation>
                  
                  </h4>

                <div class="d-flex"><div class="p-2 align-self-start"><i class="fas fa-check fa-1x"></i>
                </div><div class="p-2 align-self-end">
                <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.list1')}</span>
                          }
                  </Translation>
                    
                  </div>
                </div>

                <div class="d-flex"><div class="p-2 align-self-start"><i class="fas fa-check fa-1x"></i>
                </div><div class="p-2 align-self-end">
                <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.list2')}</span>
                          }
                  </Translation>
                  </div>
                </div>

                <div class="d-flex"><div class="p-2 align-self-start"><i class="fas fa-check fa-1x"></i>
                </div><div class="p-2 align-self-end">
                <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.list3')}</span>
                          }
                  </Translation>
                  </div>
                </div>

                <div class="d-flex"><div class="p-2 align-self-start"><i class="fas fa-check fa-1x"></i>
                </div><div class="p-2 align-self-end">
                <Translation>
                          {
                            (t, { i18n }) => <span>{t('register.list4')}</span>
                          }
                  </Translation>
                  </div>
                </div>


              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default withTranslation()(SignUp);

