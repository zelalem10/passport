import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as authenticationAction from '../../redux/actions/authenticationAction';
import { useHistory } from "react-router-dom";
//import PropTypes from 'prop-types';


const Errorstyle = {
  marginTop: "-1rem",
  marginLeft: "2.5rem",
  };
  const accesstoken = localStorage.systemToken;
  const config = {
    headers: { Authorization: `Bearer ` +  accesstoken}
  };

function SignIn () {
  let [Email, setEmail] = useState('');
  let [Password, setPassword] = useState('');
  let [EmailError, setEmailError] = useState('');
  let [PasswordError, setPasswordError] = useState('');

  let history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({});
  //validate form
  const validate = () => {
  debugger;


    if (!Email){
      EmailError = 'Please Enter Your Email Address.';
    }
    else 
    EmailError = "";
    if (!Password){
      PasswordError = 'Please Enter Your Password.';
    }
    else 
    PasswordError = "";

    if(EmailError || PasswordError){
      setEmailError(EmailError)
      setPasswordError(PasswordError)
      return false;
    }


    return true;
  }

  const personalDetail = () => {
    debugger;
    let userId = localStorage.userId;
    axios.get(`https://epassportservices.azurewebsites.net/Person/api/V1.0/Person/GetByUserId?userId=${userId}`, config)
    .then((response) => {
      console.log(response.data.person)
      localStorage.setItem('personalDetail', JSON.stringify(response.data.person));
      localStorage.removeItem('userId');
    }).catch((error) => {
      console.log(error)
    })
 
  }

  const LogInSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
        if (isValid){
          axios({
      
            method: 'post',
            url: 'https://epassportservices.azurewebsites.net/User/api/V1.0/Account/SignIn',
            data: {
              "username": Email,
              "password": Password
            },
      
          })
          .then((response) => {
            setState(response.data)
            console.log(response.data)
            localStorage.setItem('userToken', response.data.accessToken);
            localStorage.setItem('userId', response.data.id);
            personalDetail();
            // redirect if user logged in
            if (response.data.accessToken){
              //return <Redirect to="/Home" />
              history.push('/')
            }
          }).catch((error) => {
            console.log("error" + error)
          })
       
        }
  }


  return (
    <MDBContainer className='my-5'>
      <MDBRow>
         <MDBCol md="3"></MDBCol>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4">
      
              <form onSubmit={LogInSubmit}>
              <div className="header pt-3 textBackground mb-5">
                <MDBRow className="d-flex justify-content-center">
                  <h4 className="white-text my-3 py-3 font-weight-bold">
                  <MDBIcon icon="lock" className='mr-1'/>  Log In
                </h4>
                </MDBRow>
              </div>
              <div className="grey-text">
                <MDBInput
                label="Email"
                icon="envelope"
                Email={Email}
                name='Email'
                value={Email}
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={e => setEmail(e.target.value)}
              />
                  {EmailError && (
                  <div className='red-text' style={Errorstyle}>{EmailError}</div>
                  )}
                  <MDBInput
                    label="Password"
                    icon="lock"
                    password={Password}
                    name='Password'
                    value={Password}
                    group
                    type="password"
                    validate
                    onChange={e => setPassword(e.target.value)}
                  />
                  {PasswordError && (
                  <div className='red-text' style={Errorstyle}>{PasswordError}</div>
                  )}
              </div>
              <div className="text-center my-3 signUpbutton">
                <MDBBtn
                  type="submit"
                  rounded
                  className="btn-block z-depth-1a btn-info"
                >
                  Sign in <i class="fas fa-sign-in-alt ml-1"></i>
                </MDBBtn>
              </div>
              </form>
          
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1">

                  Password?
                </a>
              </p>

            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-medium grey-text d-flex justify-content-end">
                Not a member?
                <a href="/SignUp" color="cyan" className="blue-text mx-2">

                  Sign Up
                </a>
              </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

// SignIn.PropTypes = {
//   actions: PropTypes.object.isRequired,
// };
export default SignIn;

// Retrieve the object from storage
// var retrievedObject = localStorage.getItem('personalDetail');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));