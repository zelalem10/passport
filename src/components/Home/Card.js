import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardBody,
  MDBContainer,
} from 'mdbreact';
import { Link } from 'react-router-dom';
import { faPassport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardExample = () => {
  return (
    <MDBContainer className="passport-card-deck passport-container"  fluid>
      <MDBCardGroup className="passport-card">
        <MDBCard className="mr-4">
          <MDBCardBody>
            {/* <FontAwesomeIcon icon={faPassport} size="lg" /> */}
            <img
            className="w-10 mb-2"
            src={require('../../images/icons/new-passport-.png')}
          ></img>
            <MDBCardTitle tag="h5">
            <Link class="card-title text-white" to="/request-appointment">Start New Application</Link> 
              </MDBCardTitle>
            <MDBCardText>
            Do you want to secure Ethiopian Passport now? Provide all requested information and apply.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mr-4">
          <MDBCardBody>
          <img
            className="w-10 mb-2"
            src={require('../../images/icons/Passport-renewal.png')}
          ></img>
            <MDBCardTitle tag="h5">
            <Link class="card-title text-white" to="/SignUp">REGISTER</Link> 
          
              </MDBCardTitle>
            <MDBCardText>
            Are you planning to be a frequent Passport user? 
            Register and let us remember you so that you won’t have to fill application forms from scratch every time. This is optional.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mr-4">
          <MDBCardBody>
          <img
            className="w-10 mb-2"
            src={require('../../images/icons/check status copy.png')}
          ></img>
            <MDBCardTitle tag="h5">
            <Link class="card-title text-white" to="/Status"> Check Status</Link> 
            
              </MDBCardTitle>
            <MDBCardText>
            What is the status of my Ethiopian Passport request? Provide all requested tracking information and check now.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
};

export default CardExample;
