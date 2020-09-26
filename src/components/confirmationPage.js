import React from 'react';
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
function confirmationPage() {
  const handlePrint = () => {
    debugger;
    // var content = document.getElementById('divcontents');
    // var mywindow = window.open('', 'Print', 'height=600,width=800');

    // mywindow.document.write(
    //   '<html><head><title>Print</title><link media="all" type="text/css" rel="stylesheet" href="./App.css"/>'
    // );
    // mywindow.document.write('</head><body >');
    // mywindow.document.write(content);
    // mywindow.document.write('</body></html>');

    // mywindow.document.close();
    // mywindow.focus();
    // mywindow.print();
    // mywindow.close();
    var content = document.getElementById('divcontents');
    // var pri = window.open('', 'Print', 'height=600,width=800');
    var pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open();
    pri.document.write(
      '<html><head><title>Print</title><link media="all" type="text/css" rel="stylesheet" href="../App.css"/>'
    );
    pri.document.write('</head><body >');
    pri.document.write(content.innerHTML);
    pri.document.write('</body></html>');
    pri.document.close();
    pri.focus();
    pri.print();
  };

  return (
    <>
      <MDBContainer className="passport-container confirmation-page pt-3" fluid>
        <MDBCol>
          <MDBCard>
            <MDBRow className="confirmation-print-btn no-print">
              <button class="print-button " onClick={() => window.print()}>
                <span class="pr-2">Print</span>
                <span class="print-icon"></span>
              </button>
            </MDBRow>
            <MDBCardBody id="section-to-print">
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
                  <h3>Appointment Id 5445568</h3>
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
                        <legend>Appointment Site</legend>
                        <hr class="text-primary" />
                        <div class="form-group form-inline">
                          <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                            Request Status
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <b>
                            <label class="font-weight-bold">Pending</label>
                          </b>
                        </div>
                        <div class="form-group form-inline">
                          <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                            Request Type
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <b>
                            <label class="font-weight-bold">New</label>
                          </b>
                        </div>
                        <div class="form-group form-inline">
                          <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                            Request Mode
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <b>
                            <label class="font-weight-bold">Urgent</label>
                          </b>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-6">
                      <fieldset>
                        <legend>Appointment Site</legend>
                        <hr class="text-primary" />
                        <div class="col-md-6">
                          <div class="form-group form-inline">
                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                              Appointment Date
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <b>
                              <label class="font-weight-bold">2020-09-26</label>
                            </b>
                          </div>
                          <div class="form-group form-inline">
                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                              Appointment Time
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <b>
                              <label class="font-weight-bold">11:00 Am</label>
                            </b>
                          </div>
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
                        <th>Last Name</th>
                        <th>Application Id</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
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
      <style>{`@media print {.no-print{display: none;}}`}</style>
    </>
  );
}
export default confirmationPage;
