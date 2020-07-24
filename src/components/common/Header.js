import React, { Component, useState, useContext } from 'react';
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

const NavbarPage = (props) => {
  const navPath = props.location.pathname;
  const [navOpen, toggleOpen] = useState(false);
  const closeNav = () => {
    toggleOpen(false);
  };

  let style = {
    color: 'black',
    'font-weight': '400',
  };
  // const { activePath } = appContext;
  return (
    <>
      <MDBNavbar>
        <MDBContainer fluid style={{ width: '80%' }}>
          <MDBNavbarNav left>
            <MDBCol md="4">
              <img
                src="https://www.ethiopianairlines.com/images/default-source/default-album/icons/et-logo.png"
                className="img-fluid"
                alt=""
              />
            </MDBCol>
          </MDBNavbarNav>
          <MDBNav right>
            <MDBNavItem>
              <MDBNavLink style={style} to="#!">
                E-visa
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink style={style} to="https://www.ethiopianairlines.com">
                Ethioian Airlines
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                style={style}
                to="https://www.ethiopianskylighthotel.com"
              >
                Ethioian Skylight Hotel
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
        </MDBContainer>
      </MDBNavbar>
      <MDBNavbar className="headerNav" color="indigo" dark expand="md">
        <MDBNavbarToggler onClick={() => toggleOpen(!navOpen)} />
        <MDBCollapse id="navbarCollapse3" isOpen={navOpen} navbar>
          <MDBContainer fluid style={{ width: '80%' }}>
            <MDBNavbarNav className="d-flex col-example" left>
              <MDBNavItem className={navPath == '/' ? 'active' : ''}>
                <MDBNavLink to="/" activeClassName="active">
                  Home
                </MDBNavLink>
              </MDBNavItem>
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
              <MDBNavItem
                className={navPath == '/check-availablity' ? 'active' : ''}
              >
                <MDBNavLink to="/check-availablity">
                  Check Availablity
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem
                className={navPath == '/check-status' ? 'active' : ''}
              >
                <MDBNavLink to="/check-status">Check Status</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem
                className={navPath == '/manage-booking' ? 'active' : ''}
              >
                <MDBNavLink to="/manage-booking">Manage Booking</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>

            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="#!">Register &nbsp;&nbsp;|</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">Login</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBCollapse>
      </MDBNavbar>
    </>
  );
};

export default NavbarPage;
