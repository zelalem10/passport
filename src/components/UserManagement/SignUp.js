import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';


    const accesstoken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk4MDgyODAwLCJleHAiOjE1OTgwOTcyMDAsImlhdCI6MTU5ODA4MjgwMH0.4Ua-uDj1UUwnTAWhReLKOne_2ArNOFBVmBS13CFilPw`;


// intial state
const intialState = {
  personRequest : {
    firstName:'',
    MiddleName:'',
    lastName:'',
    firstNameError : '',
    MiddleNameError:'',
    lastNameError :'',
  },
  
  userRequest : {
    email:'',
    password: '',
    emailError :'',
    passwordError : ''
  },
}

class SignUp extends Component {

      state = intialState


    //validate form
    validate = () => {
      let firstNameError = '';
      let lastNameError = '';
      let emailError ='';
      let passwordError = '';
      let MiddleNameError='';

      if (!this.state.personRequest.firstName){
        firstNameError = 'Please enter your first name.';
      }
      if (!this.state.personRequest.MiddleName){
        MiddleNameError = 'Please enter your Middle Name.';
      }
      
      if (!this.state.personRequest.lastName){
        lastNameError = 'Please enter your last name.';
      }
      if (!this.state.userRequest.email){
        emailError = 'Please enter email address.';
      }
      if (!this.state.userRequest.password){
        passwordError = 'please enter password.';
      }
      else if (this.state.userRequest.password.length < 6){
        passwordError = 'Please enter at least 6 charachter.';
      }

      if(firstNameError || lastNameError || emailError || passwordError){
        this.setState({firstNameError, MiddleNameError, lastNameError, emailError, passwordError})

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

    UserchangeHandler = (e) => {
      const {userRequest} = { ...this.state };
      const userRequestState = userRequest;
      const { name, value } = e.target;
      userRequestState[name] = value;
    
      this.setState({userRequest: userRequestState});

    }

    submitHandler = (e) => {
       e.preventDefault()
       console.log(this.state);
        const isValid = this.validate();
        if (isValid){

        axios({

          headers: { 'Authorization': 'Bearer ' + accesstoken },

          method: 'post',

          url: 'http://svdrbas03:2222/api/Register/V1.0/UserRegistration/RegisterUser',

          data: this.state,

        })
        .then(Response => {
            console.log(Response);
            alert('success');
          // window.location.href = "./signIn";
            
        })
        .catch(err => {
         console.log(err);
         alert('error');
     }) 
  
     // clear form
      this.setState(intialState.personRequest);
      this.setState(intialState.userRequest);
    }

    }

    render() {
        const {personRequest,userRequest} = this.state
        return (
           
    <MDBContainer className='my-5'>
      <MDBRow>
      <MDBCol lg="3">
        </MDBCol>
        <MDBCol lg="6">
        <MDBCard>
        <MDBCardBody>
              <form onSubmit ={this.submitHandler}>
              <div className="header pt-3 blue-gradient mb-5">
                <MDBRow className="d-flex justify-content-center">
                  <h4 className="white-text my-3 py-3 font-weight-bold">
                      Sign Up
                </h4>
                </MDBRow>
              </div>
            
                <div className="grey-text">
                  <MDBInput
                    label="Your First Name"
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
                  <div className='red-text'>{this.state.firstNameError}</div>
                  ) : null}
                     <MDBInput
                    label="Your Middle Name"
                    name='MiddleName'
                    value= {personRequest.MiddleName}
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.changeHandler}
                  />
                  {this.state.MiddleNameError? (
                  <div className='red-text'>{this.state.MiddleNameError}</div>
                  ) : null}
                   <MDBInput
                    label="Your Last Name"
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
                  <div className='red-text'>{this.state.lastNameError}</div>
                  ) : null}
                  <MDBInput
                    label="Your Email"
                    icon="envelope"
                    name='email'
                    value={userRequest.email}
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.UserchangeHandler}
                  />
                  {this.state.emailError? (
                  <div className='red-text'>{this.state.emailError}</div>
                  ) : null}
                  <MDBInput
                    label="Your Password"
                    icon="lock"
                    password={userRequest.password}
                    name='password'
                    group
                    type="password"
                    validate
                    onChange={this.UserchangeHandler}
                  />
                  {this.state.passwordError? (
                  <div className='red-text'>{this.state.passwordError}</div>
                  ) : null}
                </div>
                <MDBRow className='d-flex align-items-center mb-4 '>
                <MDBCol md='6' className='text-center my-2'>
                  <MDBBtn className='z-depth-1' gradient="blue" type="submit" rounded block>
                    Sign Up
                  </MDBBtn>
 
                </MDBCol>
                <MDBCol md='6'>
                  <p className='font-medium grey-text d-flex justify-content-end'>
                    Have an account?
                    <a href='/signIn' className='blue-text ml-1'>
                      Log in
                    </a>
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
