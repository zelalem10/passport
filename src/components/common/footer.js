import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const FooterPage = () => {
  return (
    <MDBFooter
      style={{ backgroundColor: '#093c73' }}
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
              About Passport Service
            </h5>
            <ul style={{ 'padding-left': 0 }}>
              <li className="list-unstyled">
                <Link to="/Information">Requirements</Link>
              </li>
              <li className="list-unstyled">
                <Link to="/request-appointment">Schedule an Appointment</Link>
              </li>
              <li className="list-unstyled">
                <Link to="/status">Status</Link>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4" style={{ 'padding-left': 0 }}>
            <h5 className="title" style={{ fontWeight: 400 }}>
              Contact
            </h5>
            <ul style={{ 'padding-left': 0 }}>
            <li className="list-unstyled">
            <span class="fa  fa-map-marker"></span>
            <Link to="/contactUs"><strong class="text-white evisa-footer">&nbsp;Addis Ababa, Ethiopia</strong></Link>

              </li>
              <li className="list-unstyled">
                <a href="tel:8133">
                  <FontAwesomeIcon className="fa-rotate-90" icon={faPhone} />
                  8133 FREE CALL
                </a>
              </li>
              <li className="list-unstyled">
                <a href="mailto:support@ethiopianpassportservices.gov.et">
                  <FontAwesomeIcon icon={faEnvelope} />
                  support@ethiopianpassportservices.gov.et
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
                <Link to="/Faq">FAQ</Link>
              </li>
            </ul>
          </MDBCol>
          <hr />
        </MDBRow>
        <MDBRow>
          <img
            className="pr-3 pt-3 "
            src={require('../../images/default-source/footer_img/CbeBank.jpg')}
          ></img>
          <img
            className="pr-3 pt-3"
            src={require('../../images/default-source/footer_img/CbeBirr.jpg')}
          ></img>
          <img
            className="pr-3 pt-3"
            src={require('../../images/default-source/footer_img/amole.jpg')}
          ></img>
          <img
            className="pr-3 pt-3"
            src={require('../../images/default-source/footer_img/pss.jpg')}
          ></img>
          <img
            className="pr-3 pt-3"
            src={require('../../images/default-source/footer_img/Abisiniya.jpg')}
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
