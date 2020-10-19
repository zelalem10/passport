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
import { useTranslation, Trans } from 'react-i18next';

const CardExample = () => {
  const { t, i18n } = useTranslation();
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
            <Link class="card-title text-Dark" to="/request-appointment"><Trans>homeCard.startNewApplication</Trans> </Link> 
              </MDBCardTitle>
            <MDBCardText>
          <Trans>homeCard.startNewApplicationDescription</Trans>  
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
            <Link class="card-title text-Dark" to="/SignUp"><Trans>homeCard.register</Trans></Link> 
          
              </MDBCardTitle>
            <MDBCardText>
            <Trans>homeCard.registerDescription</Trans>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mr-4">
          <MDBCardBody>
          <img
            className="w-10 mb-2"
            src={require('../../images/icons/check status copy.png')}
            onMouseOver={e => (e.currentTarget.src =require('../../images/icons/passport-statusblack.png'))}
       onMouseOut={e => (e.currentTarget.src = require('../../images/icons/check status copy.png'))}
          ></img>
            <MDBCardTitle tag="h5">
            <Link class="card-title text-Dark" to="/Status"><Trans>homeCard.checkStatus</Trans></Link> 
            
              </MDBCardTitle>
            <MDBCardText>
            <Trans>homeCard.checkStatusDescription</Trans>

            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
};

export default CardExample;
