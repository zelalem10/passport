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
  } = props;
  debugger;
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
                                <h5 class='vertical-center text-center'>
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
                                </div>

                                {/* <a
                                  className="hoverWhite"
                                  onClick={() => openModal(user.requestId)}
                                >
                                  {' '}
                                  <div class="float-right mr-4">
                                    <i class="far fa-trash-alt fa-lg"></i>
                                  </div>
                                </a> */}
                              
                                <a
                                  className="hoverWhite"
                                  onClick={() => handleEdit(user.requestId)}
                                >
                                  {' '}
                                  <MDBTooltip
                                  domElement
                                  tag="span"
                                  placement="top"
                                >
                              
                                  <span class="float-right mr-4">
                                    <i class="fas fa-edit fa-lg"></i>
                                  </span>
                                  <span className="white-text"> Edit your application</span>
                                </MDBTooltip>
                               
                                </a>

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
                                  <span className="white-text"> View your application</span>
                                </MDBTooltip>
                             
                                </a>

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
                                  <span className="white-text"> Re schedule your application</span>
                                </MDBTooltip>
                            
                                </a>

                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle>
                                    {
                                      'Are you sure you want to cancel this Schedule?'
                                    }
                                  </DialogTitle>

                                  <DialogContent>
                                    <DialogContentText></DialogContentText>
                                  </DialogContent>

                                  <DialogActions>
                                    <Button
                                      onClick={() =>
                                        cancelSchedule(cancelRequestId)
                                      }
                                      color="secondary"
                                      autoFocus
                                    >
                                      Yes
                                    </Button>

                                    <Button
                                      onClick={handleClose}
                                      color="primary"
                                    >
                                      Cancel
                                    </Button>
                                  </DialogActions>
                                </Dialog>
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
