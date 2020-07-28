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

import { faPassport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardExample = () => {
  return (
    <MDBContainer className="passport-card-deck" fluid style={{ width: '80%' }}>
      <MDBCardGroup className="passport-card">
        <MDBCard className="mr-4">
          <MDBCardBody>
            <FontAwesomeIcon icon={faPassport} size="lg" />
            <MDBCardTitle tag="h5">Start new application</MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mr-4">
          <MDBCardBody>
            <FontAwesomeIcon icon={faPassport} size="lg" />
            <MDBCardTitle tag="h5">I already have a passport</MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mr-4">
          <MDBCardBody>
            <FontAwesomeIcon icon={faPassport} size="lg" />
            <MDBCardTitle tag="h5">Check Status</MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
};

export default CardExample;
