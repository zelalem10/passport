import React from 'react';
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

const BoxPage = () => {
  return (
    <React.Fragment>
      <MDBContainer className="box-container my-5 passport-container" fluid>
        <div class="row my-5">
          <div class="col-md-6">
            <img
              src={require('../../images/default-source/shared/ET Passport.png')}
              class="img-fluid"
              alt=""
            ></img>
          </div>
          <div class="col-md-6 Informationforicon">
          <div class="u-center-text my-3">
                    <h3 class="heading-secondary">Before you apply</h3>
                </div>
               
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              All applicants should secure an online appointment when applying for a passport;
              </div>
            </div>

            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              The applicant is advised to secure their passports prior to booking their flights. Flight bookings should ONLY be made if passports are still valid for at least six (6) months;
              </div>
            </div>

            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              Confirmed appointment is required for all applicants except for those who would qualify for the courtesy lane DFA (Department of Foreign Affairs);
              </div>
            </div>
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              Applicants are reminded to be on site not earlier than 30 minutes on their selected date and time of appointment at their chosen consular office;              </div>
            </div>
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              Personal appearance is required for all applicants;              </div>
            </div>
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              Please be warned that dealing with fixers (illegal arrangements) is at your own risk and expense;              </div>
            </div>
            <div class="d-flex mb-5" >
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              Prepare all the originals and photocopies of the documentary requirements for passport application;              </div>
            </div>
  


                      {/* <div class="col-12 medium text-center my-3"><Link to="/Information" class="btn btnBlu">Read More</Link></div> */}
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

export default BoxPage;
