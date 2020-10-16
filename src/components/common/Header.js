import React, {
  Component,
  useState,
  useEffect,
  useContext,
  Fragment,
} from 'react';
import {
  logout,
  authentication,
} from '../../redux/actions/authenticationAction';

import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBCol,
  MDBNav,
  MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';

const NavbarPage = (props) => {
  const { t, i18n } = useTranslation();
  const navPath = props.location.pathname;
  const [navOpen, toggleOpen] = useState(false);
  const [value, setvalue] = useState("en");

  const closeNav = () => {
    toggleOpen(false);
  };

  let history = useHistory();

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('userToken');
    localStorage.removeItem('personalDetail');
    localStorage.removeItem('userId');
    history.push('/signIn');
  }

  let style = {
    color: 'black',
    'font-weight': '400',
  };
  let token = localStorage.userToken;
  let firstName;
  let middelName;
  let lastName;

  const checkToken = useSelector((state) => state.userData);
  if (localStorage.logedInUsedData) {
    var retrievpersonalDetail = localStorage.getItem('logedInUsedData');

    let personalDetail = JSON.parse(retrievpersonalDetail);
    firstName = personalDetail.firstName;
    lastName = personalDetail.lastName;
  }

  const authLinks = (
    <div>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ml-auto">
          <a className="nav-link" href="#">
            <strong class='mr-md-3'> Welcome,   {firstName} {lastName}</strong>
          </a>

        </li>
        <li className="nav-item ml-auto">
          <a className="nav-link" href="#" onClick={logout}>
            <i class="fas fa-sign-out-alt"></i> <strong>Log out</strong>
          </a>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/SignUp">
         <Trans>header.register</Trans>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/SignIn">
        <Trans>header.logIn</Trans>
        </Link>
      </li>
    </ul>
  );
  const onLanguageHandle = (e) => {
    debugger;
    
    let newLang = e.currentTarget.dataset.id ;
    setvalue({ value: newLang });
    i18n.changeLanguage(newLang);
  };

  const renderRadioButtons = () => {
    return (
      <div>

  <div class="sl-nav text-dark">
  <Trans>header.languageTitel</Trans> 
    <ul>
      <li ><b>  <Trans>header.language</Trans> </b> <i class="fa fa-angle-down" aria-hidden="true"></i>
        <div class="triangle"></div>
        <ul>
          <li onClick={onLanguageHandle.bind(this)} data-id="en"><i class="sl-flag flag-usa"><div id="germany"></div></i> <span class="active">English</span></li>
          <li onClick={onLanguageHandle.bind(this)} data-id="am"><i class="sl-flag flag-amhara"><div id="germany"></div></i> <span class="active">Amharic</span></li>
          <li onClick={onLanguageHandle.bind(this)} data-id="om"><i class="sl-flag flag-usa"><div id="germany"></div></i> <span class="active">AfanOromo</span></li>
          <li onClick={onLanguageHandle.bind(this)} data-id="ti"><i class="sl-flag flag-de"><div id="germany"></div></i> <span class="active">Tigrigna</span></li>

        </ul>
      </li>
    </ul>
  </div>

  </div>


    );
  };

  return (
    <Fragment>
      <MDBNavbar className="headerOne">
        <MDBContainer className="passport-container" fluid>
          <MDBNavbarNav left>
            <Link to="/">
              <img
                src={require('../../images/default-source/shared/INVEA-logo.png')}
                className="img-fluid logo-img w-100 p-2"
                alt="Ethiopian ePassport logo"
              />
            </Link>
          </MDBNavbarNav>
          <MDBNav right>
            <MDBNavItem className="d-none d-md-block">
              <a
                style={style}
                href="https://www.evisa.gov.et"
                className="text-dark mr-4"
              >
                <Trans>header.evisa</Trans>
              </a>
            </MDBNavItem>
            <MDBNavItem className="d-none d-md-block">
              <a
                style={style}
                href="https://www.ethiopianairlines.com"
                className="text-dark mr-4"
              >
              <Trans>header.ethiopianAirlines</Trans>
             
              </a>
            </MDBNavItem>
            <MDBNavItem className="d-none d-md-block">
              <a
                style={style}
                href="https://www.ethiopianskylighthotel.com"
                className="text-dark mr-4"
              >
             <Trans>header.ethiopianSkylightHotel</Trans>
              
              </a>
            </MDBNavItem>
            <MDBNavItem className="">

              {renderRadioButtons()}
            </MDBNavItem>
          </MDBNav>
        </MDBContainer>
      </MDBNavbar>
      <MDBNavbar className="headerTwo" dark expand="md">
        <MDBNavbarToggler onClick={() => toggleOpen(!navOpen)} />
        <MDBCollapse id="navbarCollapse3" isOpen={navOpen} navbar>
          <MDBContainer className="passport-container" fluid>
            <MDBNavbarNav className="d-flex" left>
              {/* <MDBNavItem className={navPath == '/' ? 'active' : ''}>
                <MDBNavLink to="/" activeClassName="active">
                  Home
                </MDBNavLink>
              </MDBNavItem> */}
              <MDBNavItem
                className={navPath == '/request-appointment' ? 'active' : ''}
              >
                <MDBNavLink to="/request-appointment">
                 <Trans>header.scheduleanappointment</Trans>
                </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem className={navPath == '/Information' ? 'active' : ''}>
                <MDBNavLink to="/Information">
                <Trans>header.requirements</Trans>
                  
                  </MDBNavLink>
              </MDBNavItem>

              {/* <MDBNavItem
                className={navPath == '/check-status' ? 'active' : ''}
              >
                <MDBNavLink to="/check-status">Check Status</MDBNavLink>
              </MDBNavItem> */}
              <MDBNavItem className={navPath == '/Status' ? 'active' : ''}>
                <MDBNavLink to="/Status">
                <Trans>header.status</Trans>
                  
                  </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem className={navPath == '/about' ? 'active' : ''}>
                <MDBNavLink to="/about">
                <Trans>header.about</Trans>
                  
                  </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem className={navPath == '/contactUs' ? 'active' : ''}>
                <MDBNavLink to="/contactUs">
                <Trans>header.contactUs</Trans>
                  
                  </MDBNavLink>
              </MDBNavItem>

              {token && (
                <MDBNavItem
                  className={navPath == '/Application-List' ? 'active' : ''}
                >
                  <MDBNavLink to="/Application-List">
                  <Trans>header.manageApllication</Trans>
                  </MDBNavLink>
                </MDBNavItem>
              )}
            </MDBNavbarNav>

            <MDBNavbarNav right>{token ? authLinks : guestLinks}</MDBNavbarNav>
          </MDBContainer>
        </MDBCollapse>
      </MDBNavbar>
    </Fragment>
  );
};

export default NavbarPage;
