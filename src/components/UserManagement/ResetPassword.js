import React, {useState} from 'react';
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
  } from 'mdbreact';
  import axios from 'axios';



function ResetPassword(){
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disableSubmit,setDisableSubmit]=useState(true);
    const [Email, setEmail] = useState('');
    const scorePassword=(pass)=> {
        var score = 0;
        if (!pass)
            return score;
    
        // award every unique letter until 5 repetitions
        var letters = new Object();
        for (var i=0; i<pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }
    
        // bonus points for mixing it up
        var variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass),
        }
    
        var variationCount = 0;
        for (var check in variations) {
            variationCount += (variations[check] == true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;
    
        return parseInt(score);
    }
    const checkPassStrength=(pass)=>{
        var score = scorePassword(pass);
        if (score > 80)
            return "strong";
        if (score > 60)
            return "good";
        if (score >= 30)
            return "weak";
    
        return "Very Week";
    }

    const accesstoken = localStorage.systemToken;
    const config = {
      headers: { Authorization: `Bearer ` + accesstoken },
    };
const submitNewPassword=(e)=>{
    e.preventDefault();
    axios({
        method: 'post',
        url:
          'https://epassportservices.azurewebsites.net/User/api/V1.0/Account/ResetForgotedPassword',
          config,
        data: {
            username: (window.location.hash).substr(24),
            newPassword: Password,
        },
      })
        .then((response) => {
          console.log(response.data);
          
         
        })
        .catch((error) => {
          console.log('error' + error);
        });
    }


    return (
        <MDBContainer className="my-5">
        <MDBRow>
          <MDBCol md="3"></MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <form onSubmit={submitNewPassword}>
                  <div className="header pt-3 textBackground mb-5">
                    <MDBRow className="d-flex justify-content-center">
                      <h4 className="white-text my-3 py-3 font-weight-bold">
                          Reset Password
                      </h4>
                    </MDBRow>
                  </div>
                 
                  <div className="grey-text">
                  <MDBInput
                        label="Email"
                        icon="envelope"
                        name="Email"
                        value={(window.location.hash).substr(24)}
                        type="email"
                        groups
                        validate
                        error="wrong"
                        success="right"
                        disabled
                      />
                    <MDBInput
                      label="Password"
                      icon="lock"
                      password={Password}
                      name="Password"
                      value={Password}
                      group
                      type="password"
                      validate
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>Password Strength: {checkPassStrength(Password)}</span>
                    <MDBInput
                      label="Confirm Password"
                      icon="exclamation-triangle"
                      password={confirmPassword}
                      name="Password"
                      value={confirmPassword}
                      group
                      type="password"
                      validate
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    
    
                  </div>
                  <div className="text-center my-3 signUpbutton">
                  <MDBBtn
                      type="submit"
                      rounded
                      className="btn-block z-depth-1a btn-info"
                      disabled={disableSubmit}
                    >
                      Resset Password <i class="fas fa-sign-in-alt ml-1"></i>
                    </MDBBtn>
                  </div>
                </form>
               
                
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
  
}

export default ResetPassword;
