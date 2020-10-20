import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const FooterPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <MDBFooter
      style={{ backgroundColor: '#333333' }}
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
              <Trans>footer.aboutPassportService</Trans>
            </h5>
            <ul style={{ 'padding-left': 0 }}>
              <li className="list-unstyled">
                <Link to="/Information">   <Trans>footer.requirements</Trans></Link>
              </li>
              <li className="list-unstyled">
                <Link to="/request-appointment"><Trans>footer.scheduleanappointment</Trans></Link>
              </li>
              <li className="list-unstyled">
                <Link to="/status"><Trans>footer.status</Trans></Link>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4" style={{ 'padding-left': 0 }}>
            <h5 className="title" style={{ fontWeight: 400 }}>
              <Trans>footer.contactUs</Trans>
            </h5>
            <ul style={{ 'padding-left': 0 }}>
            <li className="list-unstyled">
            <span class="fa  fa-map-marker"></span>
            <Link to="/contactUs"><strong class="text-white evisa-footer">&nbsp;<Trans>footer.AddisAbabaEthiopia</Trans></strong></Link>

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
              <Trans>footer.helpAndSupport</Trans>
            </h5>
            <ul style={{ 'padding-left': 0 }}>
              <li className="list-unstyled">
                <Link to="/Faq">     
                <Trans>footer.fAQ</Trans></Link>
              </li>
            </ul>
          </MDBCol>
          <hr />
        </MDBRow>
        <MDBRow>
          <img
            className="pr-2 pt-3 footer-payment-icons"
            src={require('../../images/default-source/footer_img/svgPayment/CBE.svg')}
          ></img>
          <img
            className="pr-2 pt-3 footer-payment-icons"
            src={require('../../images/default-source/footer_img/svgPayment/CBE birr-01.svg')}
          ></img>
          <img
            className="pr-2 pt-3 footer-payment-icons"
            src={require('../../images/default-source/footer_img/svgPayment/AMOLE-01.svg')}
          ></img>
          <img
            className="pr-2 pt-3 footer-payment-icons"
            src={require('../../images/default-source/footer_img/svgPayment/pss-01.svg')}
          ></img>
          <img
            className="pr-2 pt-3 footer-payment-icons"
            src={require('../../images/default-source/footer_img/svgPayment/BOA-01.svg')}
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
          &copy; {new Date().getFullYear()} <Trans>footer.copyRight</Trans>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
