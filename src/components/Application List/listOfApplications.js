import React, { useEffect, useState } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBTooltip } from 'mdbreact';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from '../common/Spinner';

export default function ListOfApplications(props) {
  const {
    users,
    openModal,
    handleClose,
    cancelSchedule,
    open,
    handleDisplay,
    handleEdit,
    handleReschedule,
    loading,
    Message,
    cancelRequestId,
    handlePayment,
  } = props;
  const addDays = (date) => {
    var date = new Date(date);
    date.setDate(date.getDate() + 1);
    return date;
  };
  return (
    <div>
      <MDBContainer>
        <div className="header py-3 textBackground m-4">
          <MDBRow className="d-flex justify-content-center">
            <h2 className="white-text mb-3 pt-3 font-weight-bold text-center">
              List Of Your Applications
            </h2>
          </MDBRow>
        </div>
      </MDBContainer>
      {loading ? (
        <Spinner />
      ) : (
        <div className="my-5">
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              {Message && (
                <div class="alert alert-danger" role="alert">
                  {Message}
                </div>
              )}
            </div>
            <div class="col-3"></div>
          </div>

          {users.length
            ? users.map((user) => (
                <MDBContainer
                  className="passport-container pt-3 applist"
                  id="request-an-appointment"
                >
                  <MDBRow>
                    <MDBCol className="medium-12">
                      <div className="multistep-form__step">
                        <div className="small-12 column request-type">
                          <div class="request-card card card--small-gutters card--shadow row ">
                            <a class="small-12 column row card--link">
                              <div class="small-12 medium-4 column card  card--teal flex flex--column align-center text-center p-4">
                                <h5 class="vertical-center text-center">
                                  <strong>
                                    {user.personResponses.firstName}{' '}
                                    {user.personResponses.middleName}{' '}
                                  </strong>
                                </h5>

                                <div class="text-center vertical-margin-half"></div>
                              </div>

                              <div class="small-12 medium-8 column card  card--gray rtf rtf--small bold p-4">
                                <div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Type :{' '}
                                    </strong>
                                    {user.type}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Appointment Date :{' '}
                                    </strong>
                                    {new Date(
                                      user.appointmentResponse
                                        ? user.appointmentResponse.date
                                        : null
                                    )
                                      .toISOString()
                                      .substr(0, 10)}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request mode :{' '}
                                    </strong>{' '}
                                    {user.requestModeValue}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Status :{' '}
                                    </strong>{' '}
                                    {user.requestStatus}
                                  </div>{' '}
                                  <div>
                                    <strong className="d-inline">
                                      Application Number :{' '}
                                    </strong>{' '}
                                    {user.personResponses.applicationNumber}
                                  </div>{' '}
                                </div>
                                {user.requestStatus == 'UrgentApproved' ? (
                                  <a
                                    className="hoverWhite"
                                    onClick={() =>
                                      handlePayment(user.requestId)
                                    }
                                  >
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="fas fa-credit-card fa-lg"></i>
                                    </div>
                                  </a>
                                 ) : null} 
                                 {user.requestStatus == 'SendforCorrection' &&
                                user.requestStatus == 'Initial' ? (
                                  <a
                                    className="hoverWhite"
                                    onClick={() => handleEdit(user.requestId)}
                                  >
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="fas fa-edit fa-lg"></i>
                                    </div>
                                  </a>
                                 ) : null}  

                                <a
                                  className="hoverWhite"
                                  onClick={() => handleDisplay(user.requestId)}
                                >
                                  {' '}
                                  <MDBTooltip
                                    domElement
                                    tag="span"
                                    placement="top"
                                  >
                                    <span class="float-right mr-4">
                                      <i class="fas fa-eye fa-lg"></i>
                                    </span>
                                    <span className="white-text">
                                      {' '}
                                      View your application
                                    </span>
                                  </MDBTooltip>
                                </a>
                                {user.requestStatus == 'PaymentCompleted' &&
                                addDays(user.currentDate) <
                                  (user.appointmentResponse
                                    ? new Date(user.appointmentResponse.date)
                                    : new Date()) ? (
                                  <a
                                    className="hoverWhite"
                                    onClick={() =>
                                      handleReschedule(user.requestId)
                                    }
                                  >
                                    {' '}
                                    <MDBTooltip
                                      domElement
                                      tag="span"
                                      placement="top"
                                    >
                                      <span class="float-right mr-4">
                                        <i class="fas fa-calendar fa-lg"></i>
                                      </span>
                                      <span className="white-text">
                                        {' '}
                                        Re schedule your application
                                      </span>
                                    </MDBTooltip>
                                  </a>
                                 ) : null} 
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              ))
            : null}
        </div>
      )}
    </div>
  );
}
