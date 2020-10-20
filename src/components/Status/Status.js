import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Spinner from '../common/Spinner';
import { useTranslation, Trans } from 'react-i18next';
function Status(props) {
  const { t, i18n } = useTranslation();
  const {
    ApplicationNumberData,
    ShowForm,
    handleSubmit,
    ConfirmationNumberData,
    clearbutton,
    showApplicationNumberResults,
    clearSerchItems,
    loading,
    Errorstyle,
    ApplicationNumber,
    setApplicationNumber,
    setConfirmationNumber,
    ConfirmationNumber,
    AllError,
    showConfirmationNumberDataResults,
    handleDisplay,
    handleEdit,
    handleReschedule,
    handlePayment,
  } = props;
  const addDays = (date) => {
    var date = new Date(date);
    date.setDate(date.getDate() + 1);
    return date;
  };
  return (
    <>
      {
        <div>
          {ShowForm && (
            <MDBContainer>
              <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="header pt-3 textBackground my-5">
                      <MDBRow className="d-flex justify-content-center">
                        <h4 className="white-text mb-3 pt-3 font-weight-bold">
                         <Trans>status.title</Trans>
                        </h4>
                      </MDBRow>
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      placeholder=  {t('status.lableOne')}
                      value={ApplicationNumber}
                      onChange={(e) => setApplicationNumber(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder= {t('status.lableTwo')}
                      value={ConfirmationNumber}
                      onChange={(e) => setConfirmationNumber(e.target.value)}
                    />
                    {AllError && (
                      <div className="red-text" style={Errorstyle}>
                        {AllError}
                      </div>
                    )}
                    <div className="text-center py-4 mt-1">
                      <div className="text-center mb-3 signUpbutton">
                        <MDBBtn type="submit" className="btn-block btn-info">
                        <Trans>status.search</Trans>
                        </MDBBtn>
                      </div>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
        </div>
      }

      {
        <div>
          {showApplicationNumberResults && (
            <div>
              {loading ? (
                <Spinner />
              ) : (
                <MDBContainer
                  className="passport-container pt-3 applist"
                  id="request-an-appointment"
                >
                  <div className="header py-3 textBackground m-4">
                    <MDBRow className="d-flex justify-content-center">
                      <h2 className="white-text mb-3 pt-3 font-weight-bold text-center">
                        List Of Your Applications
                      </h2>
                    </MDBRow>
                  </div>
                  <MDBRow className="mt-5 mb-3">
                    <MDBCol className="medium-12">
                      <div className="multistep-form__step">
                        <div className="small-12 column request-type">
                          <div class="request-card card card--small-gutters card--shadow row ">
                            <a class="small-12 column row card--link ">
                              <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-middle">
                                <h5 class="epassportcenter">
                                  <strong>
                                    {
                                      ApplicationNumberData.personResponses
                                        .firstName
                                    }{' '}
                                    {
                                      ApplicationNumberData.personResponses
                                        .middleName
                                    }{' '}
                                  </strong>
                                </h5>
                              </div>
                              <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                                <div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Type :
                                    </strong>
                                    {ApplicationNumberData.type}{' '}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Appointment Date :{' '}
                                    </strong>
                                    {ApplicationNumberData.appointmentResponse
                                      ? ApplicationNumberData
                                          .appointmentResponse.date
                                      : null}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request mode :{' '}
                                    </strong>{' '}
                                    {ApplicationNumberData.requestModeValue}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Status :{' '}
                                    </strong>{' '}
                                    {ApplicationNumberData.requestStatus}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Application Number :{' '}
                                    </strong>{' '}
                                    {ApplicationNumberData.personResponses.applicationNumber}
                                  </div>{' '}
                                </div>
                                {ApplicationNumberData.requestStatus == 'UrgentApproved' ? (
                                  <a
                                    className="hoverWhite"
                                    onClick={() =>
                                      handlePayment(
                                        ApplicationNumberData.requestId
                                      )
                                    }
                                  >
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="fas fa-credit-card fa-lg"></i>
                                    </div>
                                  </a>
                                ) : null}
                                {ApplicationNumberData.personResponses.personStatus ==
                                  'SendforCorrection' ||
                                ApplicationNumberData.personResponses.personStatus ==
                                  'Initial' ? (
                                  <a
                                    onClick={() =>
                                      handleEdit(
                                        ApplicationNumberData.requestId,

                                        ApplicationNumberData.personResponses
                                          .length
                                      )
                                    }
                                  >
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="fas fa-edit fa-lg"></i>
                                    </div>
                                  </a>
                                 ) : null}  
                                <a
                                  onClick={() =>
                                    handleDisplay(
                                      ApplicationNumberData.requestId
                                    )
                                  }
                                >
                                  {' '}
                                  <div class="float-right mr-4">
                                    <i class="fas fa-eye fa-lg"></i>
                                  </div>
                                </a>
                                {ApplicationNumberData.requestStatus ==
                                  'PaymentCompleted' &&ApplicationNumberData.appointmentResponse?
                                (addDays(ApplicationNumberData.currentDate) <
                                  new Date(
                                    ApplicationNumberData.appointmentResponse.date
                                  )):false ? (
                                  <a
                                    onClick={() =>
                                      handleReschedule(
                                        ApplicationNumberData.requestId
                                      )
                                    }
                                  >
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="fas fa-calendar fa-lg"></i>
                                    </div>
                                  </a>
                                ) : null}
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol className="medium-12">
                      {clearbutton && (
                        <div className="text-center mb-3 signUpbutton ">
                          <MDBBtn
                            type="submit"
                            className="btn btn-info float-left ml-4"
                            onClick={() => clearSerchItems()}
                          >
                            Back To Form
                          </MDBBtn>
                        </div>
                      )}
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              )}
            </div>
          )}
        </div>
      }

      {
        <div>
          {showConfirmationNumberDataResults && (
            <div>
              {loading ? (
                <Spinner />
              ) : (
                <MDBContainer
                  className="passport-container pt-3 applist"
                  id="request-an-appointment"
                >
                  <div className="header py-3 textBackground m-4">
                    <MDBRow className="d-flex justify-content-center">
                      <h2 className="white-text mb-3 pt-3 font-weight-bold text-center">
                        List Of Your Applications
                      </h2>
                    </MDBRow>
                  </div>
                  {ConfirmationNumberData.map((confirmationData) => (
                    <MDBRow className="mt-5 mb-3">
                      <MDBCol className="medium-12">
                        <div className="multistep-form__step">
                          <div className="small-12 column request-type">
                            <div class="request-card card card--small-gutters card--shadow row ">
                              <a class="small-12 column row card--link ">
                                <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-middle">
                                  <h5 class="epassportcenter">
                                    <strong>
                                      Request Type : {confirmationData.type}{' '}
                                    </strong>
                                  </h5>
                                </div>
                                <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                                  <div>
                                    <div>
                                      <strong className="d-inline">
                                        Request Date :{' '}
                                      </strong>
                                      {confirmationData.requestDate}
                                    </div>
                                    <div>
                                      <strong className="d-inline">
                                        Request mode :{' '}
                                      </strong>{' '}
                                      {confirmationData.requestMode}
                                    </div>
                                    <div>
                                      <strong className="d-inline">
                                        Request Status :{' '}
                                      </strong>{' '}
                                      {confirmationData.requestStatus}
                                    </div>
                                  </div>

                                  <div className="hoverWhite">
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="far fa-trash-alt fa-lg"></i>
                                    </div>
                                  </div>
                                  <div className="hoverWhite">
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="fas fa-edit fa-lg"></i>
                                    </div>
                                  </div>
                                  <div className="hoverWhite">
                                    {' '}
                                    <div class="float-right mr-4">
                                      <i class="fas fa-eye fa-lg"></i>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  ))}
                  <MDBRow>
                    <MDBCol className="medium-12">
                      {clearbutton && (
                        <div className="text-center mb-3 signUpbutton ">
                          <MDBBtn
                            type="submit"
                            className="btn btn-info float-left ml-4"
                            onClick={clearSerchItems}
                          >
                            Back To Form
                          </MDBBtn>
                        </div>
                      )}
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              )}
            </div>
          )}
        </div>
      }
    </>
  );
}
export default Status;
