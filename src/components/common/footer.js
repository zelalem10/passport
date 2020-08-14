import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterPage = () => {
  return (
    <MDBFooter
      style={{ backgroundColor: '#424242' }}
      className="font-small pt-4 mt-4"
    >
      <MDBContainer
        fluid
        style={{ width: '80%' }}
        className="text-center text-md-left"
      >
        <MDBRow>
          <MDBCol md="4" style={{ 'padding-left': 0 }}>
            <h5 className="title" style={{ fontWeight: 400 }}>
              About
            </h5>
            <ul style={{ 'padding-left': 0 }}>
              <li className="list-unstyled">
                <a href="#!">Oridnary Passport</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Diplomatic Passport</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Replacment Passport 32 Pages</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Replacment of Stolen Passport</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4" style={{ 'padding-left': 0 }}>
            <h5 className="title" style={{ fontWeight: 400 }}>
              Contact
            </h5>
            <ul style={{ 'padding-left': 0 }}>
              <li className="list-unstyled">
                <a href="#!">
                  <FontAwesomeIcon className="fa-rotate-90" icon={faPhone} />
                  +251(11)1553899
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">
                  <FontAwesomeIcon icon={faEnvelope} />
                  epassport@et.gov
                </a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4" style={{ 'padding-left': 0 }}>
            <h5 className="title" style={{ fontWeight: 400 }}>
              Help and Support
            </h5>
            <ul style={{ 'padding-left': 0 }}>
              <li className="list-unstyled">
                <a href="#!">FAQ</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Terms and Conditions</a>
              </li>
            </ul>
          </MDBCol>
          <hr />
        </MDBRow>
        <MDBRow>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/first.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/second.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/third.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/fifth.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/fourth.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/sixth.png')}
          ></img>
        </MDBRow>
        <MDBRow>
          <hr
            style={{
              color: 'white',
              backgroundColor: 'white',
              height: 5,
            }}
          />
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Immigration Nationality
          and Vital Events Agency Ethiopia
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
