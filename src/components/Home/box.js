import React from 'react';
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

const BoxPage = () => {
  return (
    <React.Fragment>
      <MDBContainer className="box-container mt-4 passport-container" fluid>
      <div class="row">
    <div class="col-md-6">
    <img
              src={require('../../images/default-source/shared/ET Passport.png')}
              class="img-fluid"
              alt=""
            ></img>
    </div>
    <div class="col-md-6 passport-box-col">
    <h3 class="h3-responsive passport-box-heading">How to Apply</h3>
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
    </div>
  </div>
  </MDBContainer>
    </React.Fragment>
  );
};

export default BoxPage;
