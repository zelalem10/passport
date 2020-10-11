import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as authenticationAction from '../../redux/actions/authenticationAction';
import { useHistory } from "react-router-dom";
//import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

const Errorstyle = {
    marginTop: "-1rem",
    marginLeft: "2.5rem",
};
const accesstoken = localStorage.systemToken;
const config = {
    headers: { Authorization: `Bearer ` + accesstoken }
};

function SignIn() {
    let [Email, setEmail] = useState('');
    let [Password, setPassword] = useState('');
    let [EmailError, setEmailError] = useState('');
    let [PasswordError, setPasswordError] = useState('');
    const [loading, setloading] = useState(false);
    const [Message, setMessage] = useState(false);

    let history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({});
    //validate form
    const validate = () => {
         ;


        if (!Email) {
            EmailError = 'Please Enter Your Email Address.';
        }
        else
            EmailError = "";
        if (!Password) {
            PasswordError = 'Please Enter Your Password.';
        }
        else
            PasswordError = "";

        if (EmailError || PasswordError) {
            setEmailError(EmailError)
            setPasswordError(PasswordError)
            return false;
        }


        return true;
    }

    const personalDetail = () => {
         ;
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
        setMessage(false)
        setMessage('')
        const isValid = validate();
        if (isValid) {
            setloading(true);
            axios({

                method: 'post',
                url: 'https://epassportservices.azurewebsites.net/User/api/V1.0/Account/SignIn',
                data: {
                    "username": Email,
                    "password": Password
                },

            })
                .then((response) => {
                     ;
                    setState(response.data)
                    console.log(response.data)
                    if (response.data.accessToken) {
                        localStorage.setItem('userToken', response.data.accessToken);
                        localStorage.setItem('logedInUsedData', JSON.stringify(response.data));
                    }
                    personalDetail();
                    setloading(false);
                    let status = response.data.status
                    let errorname = response.data.message
                    if (status == 0) {
                        setMessage(true)
                        setMessage(errorname)
                    }
                    // redirect if user logged in
                    if (response.data.accessToken) {
                        //return <Redirect to="/Home" />
                        history.push('/')
                    }

                }).catch((error) => {
                    setloading(false);
                    console.log("error" + error)
                })

        }
    }


    return (

        <div>
            {loading ? (
                <Spinner />
            ) : (


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
                                                        <MDBIcon icon="lock" className='mr-1' />  Log In
                </h4>
                                                </MDBRow>
                                            </div>
                                            {
                                                Message &&
                                                <div class="alert alert-danger" role="alert">
                                                    {Message}
                                                </div>
                                            }
                                            <div className="grey-text">
                                                <MDBInput
                                                    label="Email"
                                                    icon="envelope"
                                                    Email={Email}
                                                    name='Email'
                                                    value={Email}
                                                    type='email'
                                                    groups
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
                <Link to="#!" className="blue-text ml-1">

                                                Password?
                </Link>
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



                )}
        </div>

    );
};

export default SignIn;
