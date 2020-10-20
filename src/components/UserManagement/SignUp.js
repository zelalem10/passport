import React, { Component, useState } from 'react';
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
import { useHistory } from 'react-router-dom';
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
};

function SignUp() {
  const [state,setState]=useState({
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
    human: false,
    phoneNumberError: '',
  });
  const [error,setError]=useState({});
  let history = useHistory();
  // ReCAPTCHA Client Side

  // ReCAPTCHA verify
  const verifyCaptcha = (res) => {
    console.log('Captcha loaded.');
    if (res) {
       setState((prevState) => ({
        ...prevState, human: true, humanKey: res }));
    }
  };

  // ReCAPTCHA Expired
  const expireCaptcha = () => {
     setState((prevState) => ({
      ...prevState, human: false, humanKey: null }));
  };

  //validate form
  const validate = () => {
    debugger;
    let firstNameError = '';
    let MiddleNameError = '';
    let lastNameError = '';
    let emailError = '';
    let passwordError = '';
    let passwordTwoError = '';
    let phoneNumberError = '';
    let ReCAPTCHAError = '';

    if ( state.human == false) {
      ReCAPTCHAError = 'please verify you are human.';
    }

    if (!state.firstName) {
      firstNameError = 'First name is required.';
    }
    if (!state.middleName) {
      MiddleNameError = 'Middle Name is required.';
    }

    if (!state.lastName) {
      lastNameError = 'Last Name is required.';
    }
    if (!state.phoneNumber) {
      phoneNumberError = 'Phone Number is required.';
    }
    if (!state.email) {
      emailError = 'Email Address is required.';
    }
    if (!state.password) {
      passwordError = 'Password is required.';
    } else if (  state.password.length < 6) {
      passwordError = 'At Least 6 Charachter is required.';
    }
    if (!state.passwordTwo) {
      passwordTwoError = 'Password is required.';
    } else if (  state.passwordTwo.length < 6) {
      passwordTwoError = 'At least 6 charachter is required.';
    } else if (
       state.password !==  state.passwordTwo
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
      setError({
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

 const changeHandler = (e) => {
    const { name, value } = e.target;

     setState((prevState) => ({
      ...prevState,[name]:value}));
  };

  const submitHandler = (e) => {
    debugger;
    e.preventDefault();
    const isValid =  validate();
    if (isValid) {
      let sampleData={
        "personRequest": {
          "firstName": state.firstName,
          "middleName": state.middleName,
          "lastName": state.lastName,
          "userId": 0,
          "email": state.email,
          "phoneNumber": state.phoneNumber,
          "password": state.password,
        }
      };
      console.log(sampleData);
      axios({
        headers: { Authorization: `Bearer ` + accesstoken },
        method: 'post',
        url:
          'http://epassportservices.ethiopianairlines.com/api/Register/V1.0/UserRegistration/RegisterUser',
        data:sampleData ,
      })
        .then((Response) => {
         history.push('./signIn');
        })
        .catch((err) => {
          console.log('error'+err);
        });

      // clear form
      setState((prevState) => ({
        ...prevState,firstName: '',
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
        ReCAPTCHAError: '',}));
    }
  };

<<<<<<< HEAD
    const { personRequest } =  state;
=======
  render() {
    const { personRequest } = this.state;

>>>>>>> ef0899293ccd0f60c4b1d4eb791246057832a2c0
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
                <form className="SignUp" onSubmit={ submitHandler}>
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
                          value={ state.firstName}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={ changeHandler}
                        />
                        {  error.firstNameError ? (
                          <div className="red-text" style={Errorstyle}>
                            {  error.firstNameError}
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
                          value={ error.middleName}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={ changeHandler}
                        />
                        {  error.MiddleNameError ? (
                          <div className="red-text" style={Errorstyle}>
                            {  error.MiddleNameError}
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
                          value={ state.lastName}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={ changeHandler}
                        />
                        {  error.lastNameError ? (
                          <div className="red-text" style={Errorstyle}>
                            {  error.lastNameError}
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
                          value={ state.phoneNumber}
                          icon="phone"
                          group
                          type="number"
                          validate
                          error="wrong"
                          success="right"
                          onChange={ changeHandler}
                        />
                        {  error.phoneNumberError ? (
                          <div className="red-text" style={Errorstyle}>
                            {  error.phoneNumberError}
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
                          value={ state.email}
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          onChange={ changeHandler}
                        />
                        { error.emailError ? (
                          <div className="red-text" style={Errorstyle}>
                            { error.emailError}
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
                          password={ state.password}
                          name="password"
                          group
                          type="password"
                          validate
                          onChange={ changeHandler}
                        />
                        {  error.passwordError ? (
                          <div className="red-text" style={Errorstyle}>
                            {  error.passwordError}
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
                          password={ state.passwordTwo}
                          name="passwordTwo"
                          group
                          type="password"
                          validate
                          onChange={ changeHandler}
                        />
                        { error.passwordTwoError ? (
                          <div className="red-text" style={Errorstyle}>
                            { error.passwordTwoError}
                          </div>
                        ) : null}
                      </div>
                      <div class="col-md-6">
                        <ReCAPTCHA
                          class="my-2"
                          //sitekey="6Ld4CtkZAAAAAEiEoslw25wHdYBNkkRjQJrJ29KI"
                          sitekey="6Ld1odEZAAAAAC_M4JbsRXzapA5aSZXUd5ukXuBV"
                          onChange={ verifyCaptcha}
                          onExpired={ expireCaptcha}
                        />
                        { error.ReCAPTCHAError ? (
                          <div className="red-text ml-5">
                            { error.ReCAPTCHAError}
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
<<<<<<< HEAD
=======
}
export default withTranslation()(SignUp);
>>>>>>> ef0899293ccd0f60c4b1d4eb791246057832a2c0

