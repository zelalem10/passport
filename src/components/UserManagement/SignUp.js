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

class SignUp extends Component {
  state = intialState;

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
      ReCAPTCHAError = 'please verify you are human.';
    }

    if (!this.state.personRequest.firstName) {
      firstNameError = 'First name is required.';
    }
    if (!this.state.personRequest.middleName) {
      MiddleNameError = 'Middle Name is required.';
    }

    if (!this.state.personRequest.lastName) {
      lastNameError = 'Last Name is required.';
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
          'https://epassportservices.azurewebsites.net/api/Register/V1.0/UserRegistration/RegisterUser',
        data: this.state,
      })
        .then((Response) => {
          console.log(Response);

          window.location.href = './signIn';
        })
        .catch((err) => {
          console.log(err);
        });

      // clear form
      this.setState(intialState.personRequest);
    }
  };

  render() {
    const { personRequest } = this.state;
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
                        <span class="fa fa-user-plus mr-2"></span> Register
                      </h4>
                    </MDBRow>
                  </div>

                  <div className="grey-text">
                    <div class="row">
                      <div class="col-md-6">
                        <MDBInput
                          label="First Name"
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
                          label="Middle Name"
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
                          label="Last Name"
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
                          label="Phone Number"
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
                          label="Email"
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
                          label="Password"
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
                          label="Comfirm Password"
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
                          sitekey="6Ld1odEZAAAAAC_M4JbsRXzapA5aSZXUd5ukXuBV"
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
                        Sign Up <i class="fas fa-sign-in-alt pl-1"></i>
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="6">
                      <p className="font-medium grey-text d-flex justify-content-end">
                        <a
                          href="/signIn"
                          color="cyan"
                          className="blue-text mr-1"
                        >
                          Log In
                        </a>
                        If already registered?
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
                  <h2 class="heading-secondary">Member Benefits</h2>
                </div>
                <h4>Members get more</h4>
                <p>
                  Members save up to 10% more when booking directly on our
                  website or mobile app.
                </p>
                <h4>Points for hotel stays</h4>
                <p>
                  Earn points per US dollar spent on eligible stays and food and
                  beverage purchases charged to your room during an eligible
                  stay.
                </p>
                <h4>Free award nights</h4>
                <p>
                  Redeem for Free Award Nights starting at 9,000 points with no
                  blackout dates on Standard Rooms.
                </p>
                <h4>Phone</h4>
                <p>8133 FREE CALL</p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SignUp;