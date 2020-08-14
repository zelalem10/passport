import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBCol,
  MDBNav,
} from 'mdbreact';

class NavbarPage extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  style = {
    color: 'black',
    'font-weight': '400',
  };
  render() {
    return (
      <>
        <MDBNavbar>
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
              <MDBNavLink style={this.style} to="#!">
                E-visa
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                style={this.style}
                to="https://www.ethiopianairlines.com"
              >
                Ethioian Airlines
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                style={this.style}
                to="https://www.ethiopianskylighthotel.com"
              >
                Ethioian Skylight Hotel
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
        </MDBNavbar>
        <MDBNavbar className="headerNav" color="indigo" dark expand="md">
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="/" activeClassName="active">
                  Home
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/request-appointment">
                  Request Appointment
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/service">Service</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="../CheckAvailablityPage">
                  Check Availablity
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">Check Status</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">Manage Booking</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="/signUp">Register &nbsp;&nbsp;|</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/signIn">Login</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
     </>
    );
  }
}

export default NavbarPage;
