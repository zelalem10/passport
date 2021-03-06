import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
  MDBAlert
} from 'mdbreact';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation, Trans } from 'react-i18next';
import axiosInstance from '../Utils/axios';

const Errorstyle = {
  marginTop: '-1rem',
  marginLeft: '2.5rem',
};



function SignIn() {
  const cookies = new Cookies();
  const { t, i18n } = useTranslation();
  let [Email, setEmail] = useState('');

  let [Password, setPassword] = useState('');
  let [EmailError, setEmailError] = useState('');
  let [PasswordError, setPasswordError] = useState('');
  const [loading, setloading] = useState(false);
  const [Message, setMessage] = useState(false);
  const [isForgotPassword,setIsForgotPassword]=useState(false);
  const [showSuccessMessage,setShowSuccessMessage]=useState(false);

  let history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({});
  const [data,setData]=useState({
    human:false,
    humanKey:'',
    ReCAPTCHAError:'',
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
  //validate form
  const validate = () => {
    if (!data.human) {
      data.ReCAPTCHAError = 'Please verify you are human.';
    } else EmailError = '';
    if (!Email) {
      EmailError = 'Please Enter Your Email Address.';
    } else EmailError = '';
    if (!Password) {
      PasswordError = 'Please Enter Your Password.';
    } else PasswordError = '';

    if (EmailError || PasswordError || data.ReCAPTCHAError) {
      setEmailError(EmailError);
      setPasswordError(PasswordError);
      return false;
    }

    return true;
  };

  const personalDetail = () => {
    let userId = localStorage.userId;
    axiosInstance.get(`/Person/api/V1.0/Person/GetByUserId?userId=${userId}`)
    
      .then((response) => {
        localStorage.setItem(
          'personalDetail',
          JSON.stringify(response.data.person)
        );
        localStorage.removeItem('userId');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ForgotPasswordSubmit=(e)=>{
    e.preventDefault();
 
      setloading(true);
      axiosInstance.post('/User/api/V1.0/Account/ForgotPassword',{
        username: Email,
        callBackUrl:`${window.origin}#/resetForgotedPassword/${Email}`
      })
        .then((response) => {
          if(response.data.status==1){
            setShowSuccessMessage(true);
          }
          
          setloading(false);
        
        })
        .catch((error) => {
          console.log('error' + error);
          setloading(false);
        });
    
  }

  const LogInSubmit = (e) => {
    e.preventDefault();
    setMessage(false);
    setMessage('');
    const isValid = validate();
    if (isValid) {
      setloading(true);
      axiosInstance.post('/User/api/V1.0/Account/SignIn',
      {
        username: Email,
        password: Password,
      })
        .then((response) => {
          setState(response.data);

          console.log(response.data);

          if (response.data.accessToken) {

            let date = new Date();

            date.setTime(date.getTime() + 60 * 1000000000);

            const options = { expires: date }

            localStorage.setItem('logedInUsedData', JSON.stringify(response.data));

            cookies.set('AC_TO', response.data.accessToken, options);

            cookies.set('REF_TO', response.data.refreshToken);







          }

          personalDetail();

          setloading(false);

          let status = response.data.status;

          let errorname = response.data.message;

          if (status == 0) {

            setMessage(true);

            setMessage(errorname);

          }

          // redirect if user logged in

          if (response.data.accessToken) {

            history.push('/');

          }

        })

        .catch((error) => {
          setloading(false);
          console.log('error' + error);
        });
    }
  };
  const handleClick=(e)=>{
    e.preventDefault();
    setIsForgotPassword(!isForgotPassword);
    setEmail('');
    setPassword('');
    setMessage(false);
  



  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <MDBContainer className="my-5 ">
          <MDBRow>
            <MDBCol md="3"></MDBCol>
            <MDBCol md="6">
              {showSuccessMessage?
              <MDBAlert color="secondary" >
              <h4>Ethiopan Passport Service Forget Password Confirmation</h4>
  
  
  <p>Please check your email to reset your password...</p>
        </MDBAlert>:<MDBCard>
                <MDBCardBody className="mx-4">
                  <form onSubmit={isForgotPassword?ForgotPasswordSubmit:LogInSubmit}>
                    <div className="header pt-3 textBackground mb-5">
                      <MDBRow className="d-flex justify-content-center">
                        <h4 className="white-text my-3 py-3 font-weight-bold">{isForgotPassword? t('register.recover')
                          :<MDBIcon icon="lock" className="mr-1">  <Trans>register.logIn</Trans> </MDBIcon>}
                        </h4>
                      </MDBRow>
                    </div>
                    {Message && (
                      <div class="alert alert-danger" role="alert">
                        {Message}
                      </div>
                    )}
                    <div className="grey-text">
                      
                      <MDBInput
                        label={t('requestForm.email')}
                        icon="envelope"
                        Email={Email}
                        name="Email"
                        value={Email}
                        type="email"
                        groups
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {EmailError && (
                        <div className="red-text" style={Errorstyle}>
                          {EmailError}
                        </div>
                      )}
                      {isForgotPassword?null:
                      <>
                      <MDBInput
                        label={t('register.password')}
                        icon="lock"
                        password={Password}
                        name="Password"
                        value={Password}
                        group
                        type="password"
                        validate
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {PasswordError && (
                        <div className="red-text" style={Errorstyle}>
                          {PasswordError}
                        </div>
                      )}
                        <ReCAPTCHA
                          class="my-2"
                          //prod
                          sitekey="6Ld4CtkZAAAAAEiEoslw25wHdYBNkkRjQJrJ29KI"

                          //local
                          //sitekey="6Ld1odEZAAAAAC_M4JbsRXzapA5aSZXUd5ukXuBV"
                          onChange={verifyCaptcha}
                          onExpired={expireCaptcha}
                        />
                        {data.ReCAPTCHAError ? (
                          <div className="red-text ml-5">
                            {data.ReCAPTCHAError}
                          </div>
                        ) : null}
                      </>
      }
                    </div>
                    <div className="text-center my-3 signUpbutton">
                    {isForgotPassword?
                     <MDBBtn
                     type="submit"
                     rounded
                     className="btn-block z-depth-1a btn-info"
                   >
                     <Trans>register.recover</Trans> <i class="fas fa-sign-in-alt ml-1"></i>
                   </MDBBtn> :<MDBBtn
                        type="submit"
                        rounded
                        className="btn-block z-depth-1a btn-info"
                      >
                        <Trans>register.logIn</Trans> <i class="fas fa-sign-in-alt ml-1"></i>
                      </MDBBtn>
}
                    </div>
                  </form>
                  <a className="font-small blue-text d-flex justify-content-end pb-3" 
                  id="forgotPwd" onClick={handleClick}>
                    {isForgotPassword?<span>
                      <Trans>
                      register.remembered
                    </Trans>
                      </span>:<span>
                    <Trans>
                      register.forget
                    </Trans></span>

                  }</a>
                  
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-medium grey-text d-flex justify-content-end">
                  <Trans>register.notMemeber</Trans>
                    <Link to="/SignUp" color="cyan" className="blue-text mx-2">
                    <Trans>register.signUp</Trans>
                    </Link>
                  </p>
                </MDBModalFooter>
              </MDBCard>
           
                }</MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </div>
  );
}

export default SignIn;
