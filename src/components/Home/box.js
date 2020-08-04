import React from 'react';
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

const BoxPage = () => {
  return (
    <React.Fragment>
      <MDBContainer className="box-container mt-4 passport-container" fluid>
        <MDBRow className="passport-box-row">
          <MDBCol md="6" sm="12">
            <img
              src={require('../../images/default-source/shared/img (131)-mini.jpg')}
              className="img-fluid"
              alt=""
            ></img>
          </MDBCol>
          <MDBCol md="6" sm="12" className="passport-box-col">
            <h3 className="h3-responsive passport-box-heading">How to Apply</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <MDBBtn outline className="passport-box-btn" color="primary">
              Reed more
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
};

export default BoxPage;
