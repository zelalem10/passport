import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Spinner from '../common/Spinner';

function Status(props) {
  const {
    ApplicationNumberData,
    ShowForm,
    handleSubmit,
    setPassportNumber,
    ConfirmationNumberData,
    clearbutton,
    showApplicationNumberResults,
    PassportNumberData,
    PassportNumber,
    clearSerchItems,
    loading,
    Errorstyle,
    ApplicationNumber,
    setApplicationNumber,
    setConfirmationNumber,
    ConfirmationNumber,
    AllError,
    showPassportNumberResults,
    showConfirmationNumberDataResults,
    handleDisplay,
    handleEdit,
    handleReschedule,
  } = props;
  debugger;
  return (
    <>
      {
        <div>
          {ShowForm && (
            <MDBContainer>
              <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                  <form onSubmit={handleSubmit}>
                    <div className="header pt-3 textBackground my-5">
                      <MDBRow className="d-flex justify-content-center">
                        <h4 className="white-text mb-3 pt-3 font-weight-bold">
                          Check e-Passport status
                        </h4>
                      </MDBRow>
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Passport Number"
                      value={PassportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Application Number"
                      value={ApplicationNumber}
                      onChange={(e) => setApplicationNumber(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Confirmation Number"
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
                          Search
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
          {showPassportNumberResults && (
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
                                    Request Type : {PassportNumberData.type}{' '}
                                  </strong>
                                </h5>
                              </div>
                              <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                                <div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Date :{' '}
                                    </strong>
                                    {PassportNumberData.requestDate}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request mode :{' '}
                                    </strong>{' '}
                                    {PassportNumberData.requestMode}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Status :{' '}
                                    </strong>{' '}
                                    {PassportNumberData.requestStatus}
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
                                    Request Type : {ApplicationNumberData.type}{' '}
                                  </strong>
                                </h5>
                              </div>
                              <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                                <div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Date :{' '}
                                    </strong>
                                    {ApplicationNumberData.requestDate}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request mode :{' '}
                                    </strong>{' '}
                                    {ApplicationNumberData.requestMode}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Status :{' '}
                                    </strong>{' '}
                                    {ApplicationNumberData.requestStatus}
                                  </div>
                                </div>

                                <a
                                  href="#"
                                  //   onClick={() => openModal(ApplicationNumberData.requestId)}
                                >
                                  {' '}
                                  <div class="float-right mr-4">
                                    <i class="far fa-trash-alt fa-lg"></i>
                                  </div>
                                </a>

                                <a
                                  href="#"
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

                                <a
                                  href="#"
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

                                <a
                                  href="#"
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

                  <MDBRow className="mt-5 mb-3">
                    <MDBCol className="medium-12">
                      <div className="multistep-form__step">
                        <div className="small-12 column request-type">
                          <div class="request-card card card--small-gutters card--shadow row ">
                            <a class="small-12 column row card--link ">
                              <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-middle">
                                <h5 class="epassportcenter">
                                  <strong>
                                    Request Type : {ConfirmationNumberData.type}{' '}
                                  </strong>
                                </h5>
                              </div>
                              <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                                <div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Date :{' '}
                                    </strong>
                                    {ConfirmationNumberData.requestDate}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request mode :{' '}
                                    </strong>{' '}
                                    {ConfirmationNumberData.requestMode}
                                  </div>
                                  <div>
                                    <strong className="d-inline">
                                      Request Status :{' '}
                                    </strong>{' '}
                                    {ConfirmationNumberData.requestStatus}
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
