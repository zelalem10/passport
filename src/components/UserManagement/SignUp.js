import React, { Component } from 'react'
import axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha"

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const Errorstyle = {
    marginTop: "-2rem",
    marginLeft: "2.5rem",
    };
  const accesstoken = localStorage.systemToken;

// intial state
const intialState = {
  personRequest : {
    firstName:'',
    middleName:'',
    lastName:'',
    firstNameError : '',
    MiddleNameError:'',
    lastNameError :'',
    email:'',
    password: '',
    passwordTwo: '',
    emailError :'',
    passwordError : '',
    passwordTwoError : '',
    phoneNumber : '',
    phoneNumberError : '',

  },
  human: false,
  disabled: true
}

class SignUp extends Component {

    state = intialState

    //validate form
    validate = () => {
      let firstNameError = '';
      let MiddleNameError='';
      let lastNameError = '';
      let emailError ='';
      let passwordError = '';
      let passwordTwoError = '';
      let phoneNumberError = '';

      if (!this.state.personRequest.firstName){
        firstNameError = 'Please Enter Your First Name.';
      }
      if (!this.state.personRequest.middleName){
        MiddleNameError = 'Please Enter Your Middle Name.';
      }
      
      if (!this.state.personRequest.lastName){
        lastNameError = 'Please Enter Your Last Name.';
      }
      if (!this.state.personRequest.phoneNumber){
        phoneNumberError = 'Please Enter Your phone Number.';
      }
      if (!this.state.personRequest.email){
        emailError = 'Please Enter Your Email Address.';
      }
      if (!this.state.personRequest.password){
        passwordError = 'Please Enter Your Password.';
      }
      else if (this.state.personRequest.password.length < 6){
        passwordError = 'Please Enter at Least 6 Charachter.';
      }
      if (!this.state.personRequest.passwordTwo){
        passwordTwoError = 'Please Enter Your Password.';
      }
      else if (this.state.personRequest.passwordTwo.length < 6){
        passwordTwoError = 'Please enter at least 6 charachter.';
      }
      else if(this.state.personRequest.password !== this.state.personRequest.passwordTwo)
      {
        passwordTwoError = 'Passwords Do Not Match.';
      }

      if(firstNameError || lastNameError || emailError || passwordError || passwordTwoError || phoneNumberError){
        this.setState({firstNameError, MiddleNameError, lastNameError, emailError, passwordError, passwordTwoError, phoneNumberError})

        return false;
      }

      return true;
    }

    changeHandler = (e) => {
      const { personRequest} = { ...this.state };
      const personRequestState = personRequest;
      const { name, value } = e.target;
      personRequestState[name] = value;
    
      this.setState({ personRequest: personRequestState});

    }

    submitHandler = (e) => {
       e.preventDefault()
       console.log(this.state);
        const isValid = this.validate();
        if (isValid){

        axios({

          headers: { Authorization: `Bearer ` +  accesstoken},
          method: 'post',
          url: 'https://epassportservices.azurewebsites.net/api/Register/V1.0/UserRegistration/RegisterUser',
          data: this.state,

        })
        .then(Response => {
            console.log(Response);
      
          window.location.href = "./signIn";
            
        })
        .catch(err => {
         console.log(err);
        
     }) 
  
     // clear form
      this.setState(intialState.personRequest);

    }

    }

 // ReCAPTCHA Client Side
 onCaptchaLoad = () => {
  console.log('Captcha loaded.')
}

verifyCaptcha = (res) => {
  if(res) {
    this.setState({ human: true, humanKey: res })
    this.setState({ disabled: this.isDisabled() })
  }
}

// ReCAPTCHA Expired
expireCaptcha = () => {
  this.setState({ human: false, humanKey: null })
  this.setState({ disabled: this.isDisabled() })
}

    render() {
        const {personRequest} = this.state
        return (
           
    <MDBContainer className='my-5'>
        {/* <div class="alert alert-success" role="alert">
          Your request is success!
        </div>
        <div class="alert alert-danger" role="alert">
          your request is fail!
        </div> */}
      <MDBRow>
      <MDBCol lg="3">
        </MDBCol>
        <MDBCol lg="6">
        <MDBCard>
        <MDBCardBody>
              <form className='SignUp' onSubmit ={this.submitHandler}>
              <div className="header pt-3 mb-5 textBackground" >
                <MDBRow className="d-flex justify-content-center white-text">
                   
                  <h4 className="white-text my-3 py-3 font-weight-bold">
                  <span class="fa fa-user-plus mr-2"></span> Sign Up </h4>
                </MDBRow>
              </div>
            
                <div className="grey-text">
                  <MDBInput
                    label="First Name"
                    name='firstName'
                    value= {personRequest.firstName}
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.changeHandler}
                  />
                  {this.state.firstNameError? (
                  <div className='red-text' style={Errorstyle}>{this.state.firstNameError}</div>
                  ) : null}
                     <MDBInput
                    label="Middle Name"
                    name='middleName'
                    value= {personRequest.middleName}
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.changeHandler}
                  />
                  {this.state.MiddleNameError? (
                  <div className='red-text' style={Errorstyle}>{this.state.MiddleNameError}</div>
                  ) : null}
                   <MDBInput
                    label="Last Name"
                    name='lastName'
                    value={personRequest.lastName}
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.changeHandler}
                  />
                       {this.state.lastNameError? (
                  <div className='red-text' style={Errorstyle}>{this.state.lastNameError}</div>
                  ) : null}
                  
            
                   <MDBInput
                    label="Phone Number"
                    name='phoneNumber'
                    value={personRequest.phoneNumber}
                    icon="phone"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.changeHandler}
                  />
                   {this.state.phoneNumberError? (
                  <div className='red-text' style={Errorstyle}>{this.state.phoneNumberError}</div>
                  ) : null}
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    name='email'
                    value={personRequest.email}
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.changeHandler}
                  />
                  {this.state.emailError? (
                  <div className='red-text' style={Errorstyle}>{this.state.emailError}</div>
                  ) : null}
                  <MDBInput
                    label="Password"
                    icon="lock"
                    password={personRequest.password}
                    name='password'
                    group
                    type="password"
                    validate
                    onChange={this.changeHandler}
                  />
                    {this.state.passwordError? (
                    <div className='red-text' style={Errorstyle}>{this.state.passwordError}</div>
                    ) : null}
                  <MDBInput
                    label="Comfirm Password"
                    icon="lock"
                    password={personRequest.passwordTwo}
                    name='passwordTwo'
                    group
                    type="password"
                    validate
                    onChange={this.changeHandler}
                  />
                  {this.state.passwordTwoError? (
                  <div className='red-text' style={Errorstyle}>{this.state.passwordTwoError}</div>
                  ) : null}
                </div>
              
                <ReCAPTCHA 
                            sitekey="6LfMx48UAAAAABKWC1MVZN4pEtJ_CiY-E5hz8jKm" 
                            onChange={this.verifyCaptcha}
                            onExpired={this.expireCaptcha} 
                            />
                <MDBRow className='d-flex align-items-center mb-4 signUpbutton'>
                <MDBCol md='6' className='text-center my-2'>
                  <MDBBtn className='z-depth-1 btn-info' type="submit" rounded block>
                    Sign Up <i class="fas fa-sign-in-alt ml-1"></i>
                  </MDBBtn>
 
                </MDBCol>
                <MDBCol md='6'>
                  <p className='font-medium grey-text d-flex justify-content-end'>
                    Have an account?
                    <a href='/signIn' color="cyan" className='blue-text ml-1'>Log in</a>
     
                  </p>
                </MDBCol>
              </MDBRow>

              </form>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
    
      </MDBRow>
    </MDBContainer>
          
        )
    }
}

export default SignUp
