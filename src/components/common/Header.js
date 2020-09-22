import React, { Component, useState, useContext, Fragment } from 'react';
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
  MDBContainer,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavbarPage = (props) => {
  const navPath = props.location.pathname;
  const [navOpen, toggleOpen] = useState(false);
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

  const checkToken = useSelector((state) => state.userData);

  const authLinks = (
    <div>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={logout}>
            Log out
          </a>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/SignUp">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/SignIn">
          Log In
        </Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <MDBNavbar className="headerOne">
        <MDBContainer fluid style={{ width: '80%' }}>
          <MDBNavbarNav left>
            <div class="row">
              {/* <div class="col-md-3">
                <h1 className="header-title">ePassport</h1>
              </div> */}
              <div class="col-md-3">
                <Link to="/">
                  <img
                    src={require('../../images/default-source/shared/output-onlinepngtools (2).png')}
                    className="img-fluid logo-img"
                    alt="Ethiopian ePassport logo"
                  />
                </Link>
              </div>
            </div>
          </MDBNavbarNav>
          <MDBNav right>
            <MDBNavItem>
              <a
                style={style}
                href="https://www.evisa.gov.et"
                className="text-light mr-2"
              >
                E-visa
              </a>
            </MDBNavItem>
            <MDBNavItem>
              <a
                style={style}
                href="https://www.ethiopianairlines.com"
                className="text-light mr-2"
              >
                Ethioian Airlines
              </a>
            </MDBNavItem>
            <MDBNavItem>
              <a
                style={style}
                href="https://www.ethiopianskylighthotel.com"
                className="text-light mr-2"
              >
                Ethioian Skylight Hotel
              </a>
            </MDBNavItem>
          </MDBNav>
        </MDBContainer>
      </MDBNavbar>
      <MDBNavbar className="headerTwo" dark expand="md">
        <MDBNavbarToggler onClick={() => toggleOpen(!navOpen)} />
        <MDBCollapse id="navbarCollapse3" isOpen={navOpen} navbar>
          <MDBContainer fluid style={{ width: '80%' }}>
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
                  Request Appointment
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem className={navPath == '/service' ? 'active' : ''}>
                <MDBNavLink to="/service">Service</MDBNavLink>
              </MDBNavItem>

              {/* <MDBNavItem
                className={navPath == '/check-status' ? 'active' : ''}
              >
                <MDBNavLink to="/check-status">Check Status</MDBNavLink>
              </MDBNavItem> */}
              <MDBNavItem className={navPath == '/Status' ? 'active' : ''}>
                <MDBNavLink to="/Status">Status</MDBNavLink>
              </MDBNavItem>

              {token && (
                <MDBNavItem
                  className={navPath == '/Application-List' ? 'active' : ''}
                >
                  <MDBNavLink to="/Application-List">Manage Booking</MDBNavLink>
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
