import React from 'react';
import { useSelector } from 'react-redux';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdbreact';

function ConfirmationPage() {
  const counter = useSelector((state) => state);
  const request = counter.request[counter.request.length - 1];

  return (
    <>
      <MDBContainer id="section-to-print" className="passport-container confirmation-page pt-3" fluid>
        <MDBCol>
          <MDBCard>
            <MDBRow className="confirmation-print-btn no-print">
              <button class="print-button " onClick={() => window.print()}>
                <span class="pr-2">Print</span>
                <span class="print-icon"></span>
              </button>
            </MDBRow>
            <MDBCardBody >
              <MDBCardTitle className="confirmation-page-title1">
                <MDBRow>
                  <i class="fas fa-check-circle fa-3x confirmation-page-icon"></i>
                </MDBRow>
                <MDBRow>
                  <h3 class="heading-secondary">
                    We have recieved your Request
                  </h3>
                </MDBRow>
                <MDBRow>
  <h3>Application Number {request.personResponses.applicationNumber}</h3>
                </MDBRow>
                <MDBRow>
                  <p class="font-italic confirmation-page-paragraph">
                    We will send you an email in 2 hours about your request. If
                    accepted you will proceed to payment from the website.
                  </p>
                </MDBRow>
              </MDBCardTitle>
              <MDBCardText className="pl-4">
                <div class="pt-3">
                  <MDBRow>
                    <legend class="text-primary">Appointment Details</legend>
                  </MDBRow>
                  <div class="row">
                    <div class="col-md-6">
                      <fieldset>
                        <legend>Request Details</legend>
                        <hr class="text-primary" />
                        <div class="form-group form-inline">
                          <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                            Request Status
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <b>
                            <label class="font-weight-bold">
                              {request.requestStatus}
                            </label>
                          </b>
                        </div>
                        <div class="form-group form-inline">
                          <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                            Request Type
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <b>
                            <label class="font-weight-bold">
                              {request.type}
                            </label>
                          </b>
                        </div>
                        <div class="form-group form-inline">
                          <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                            Request Mode
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <b>
                            <label class="font-weight-bold">
                              {request.requestModeValue}
                            </label>
                          </b>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-6">
                      <fieldset>
                        <legend>Appointment Details</legend>
                        <hr class="text-primary" />
                        <div class="col-md-6">
                          <div class="form-group form-inline">
                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                              Appointment Date
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <b>
                              <label class="font-weight-bold">
                                {request.appointmentResponse.date}
                              </label>
                            </b>
                          </div>
                          {request.appointmentResponse.duration ? (
                            <div class="form-group form-inline">
                              <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                Appointment Time
                              </label>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <b>
                                <label class="font-weight-bold">
                                  {
                                    request.appointmentResponse.duration
                                      .startTime
                                  }
                                  {'-'}
                                  {
                                    request.appointmentResponse.duration.endTime
                                  }{' '}
                                  {request.appointmentResponse.duration
                                    .isMorning
                                    ? 'Am'
                                    : 'Pm'}
                                </label>
                              </b>
                            </div>
                          ) : null}
                          <div class="form-group form-inline">
                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                              Office
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <b>
                              <label class="font-weight-bold">
                                Addis Ababa
                              </label>
                            </b>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div class="pt-3">
                  <MDBRow>
                    <legend class="text-primary">Applicants Details</legend>
                  </MDBRow>
                  <MDBTable responsive>
                    <MDBTableHead color="primary-color" textWhite>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Grand Father Name</th>
                        <th>Application Id</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>{1}</td>
                        <td>{request.personResponses.firstName}</td>
                        <td>{request.personResponses.lastName}</td>
                        <td>{request.personResponses.id}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
      <iframe id="ifmcontentstoprint"></iframe>
    </>
  );
}
export default ConfirmationPage;
