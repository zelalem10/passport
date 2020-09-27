import React, { useEffect, useState } from 'react';
import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter
  , MDBContainer, MDBRow, MDBCol
} from "mdbreact";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function InstructionPage() {
  const [requestSubmited, setRequestSubmited] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [message, setMessage] = useState("");
  const [flowType, setFlowType] = useState(0);
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const selectedId = { optionId: 0 }
  var selectedOption = counter.paymentOption[counter.paymentOption.length - 1]
  console.log(selectedOption)

  useEffect(() => {
    const accesstoken = localStorage.systemToken;
    const config = {
      headers: { Authorization: "Bearer " + accesstoken }
    };
    const body = {
      firstName: 'Atalay',
      lastName: 'Tilahun',
      email: 'atehun@gmail.com',
      phone: "0932876051",
      amount: 10,
      currency: "ETB",
      city: "Addis Ababa",
      country: "Ethiopia",
      channel: "Mobile",
      paymentOptionsId: selectedOption ? selectedOption.optionId : 0,
      traceNumbers: "",
      Status: 4,
      OrderId: "",
      otp: "",
      requestId: 3,
    };
    axios.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
      .then((todo) => {
        console.log(todo.data)
        setStatus(todo.data.status)
        setInstruction(todo.data.instruction)
        setFlowType(todo.data.paymentFlowType)
        setMessage(todo.data.message)
        setRequestSubmited(true)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err.response);
      })
}, [])

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
export default InstructionPage;
