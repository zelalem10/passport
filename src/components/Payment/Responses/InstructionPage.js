import React, { useEffect, useState } from 'react';
import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter
  , MDBContainer, MDBRow, MDBCol
} from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';



function InstructionPage() {
  const data = useSelector((state) => state);
  let paymentInformation = data.paymentOption[data.paymentOption.length-1];
  let personRequestdata = useSelector((state) => state.request[state.request.length - 1]);

  const personalInformation = personRequestdata
  ? personRequestdata.personResponses
  : null;

  const appointmentInformation = personRequestdata
  ? personRequestdata.appointmentResponse
  : null;
  const dateFormatter = (date) => {
    if(date && typeof(date)!=='undefined'){
    let selectDays = new Date(date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(selectDays);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(selectDays);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(selectDays);
    return (`${mo} ${da}, ${ye}`);
    }
}
  return (
    <>
      <div id="share-section" class="bg-light text-muted py-5">
        <div class="container" id="section-to-print">
        <MDBRow className="confirmation-print-btn no-print">
              <button class="print-button " onClick={() => window.print()}>
                <span class="pr-2">Print</span>
                <span class="print-icon"></span>
              </button>
            </MDBRow>
          <div class="row">
          
            <div class="col-md-8">
            
              <div class="u-center-text u-margin-bottom-big"><h2 class="heading-secondary">Payment Instruction</h2></div>
              <div class="alert alert-success my-4 p-3" role="alert">
              <h6 class="font-weight-bold u-center-text m3-5">Thank you for making this request. Please follow step below to process payment.</h6>
              </div>
            
              {paymentInformation? paymentInformation.instractions?.length
                ? paymentInformation.instractions.map((instruction) => (
                  <div class="d-flex">

                    <div class="p-3 align-self-start">
                      <i class="fas fa-check fa-1x"></i>
                    </div>
                    <div class="p-3 align-self-end">
                      {instruction.description}
                    </div>
                  </div>
                ))
                : null  :null}

              <p class="">
          
                

          </p>
          <div class="alert alert-danger my-4 p-3" role="alert">
              <h6 class=" m3-5">     
               N.B : Please ensure that you make the exact payment within 48 hours after making the request order. 
               {/* If you do not get your request order in 2 days after marking payment, please contact by using this email address. */}
               If you do not get any SMS or email confirmation in 2 hours after making the payment, please contact us by this email address: 
               <a href="mailto:support@ethiopianpassportservices.gov.et">
            <strong>
             support@ethiopianpassportservices.gov.et
             </strong>
             </a>
             <br></br>
             Phone Number : 8133
             <br></br>
             Only payment through payment order is acceptable (direct depositing and transferring a payment to the account is not acceptable)

                </h6>
              </div>
          <p>
        
       
          </p>

            </div>


            <div class="col-md-4 order-md-2 mb-4 mt-5">
                <ul class="list-group mb-3">
                    <li class="list-group-item ePassprt-color"><h5>Personal Information</h5></li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">First Name</h6>
                      </div><span class="text-muted"> 
                      {personalInformation? personalInformation.firstName : null}
                      </span></li>
                      <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">Father Name</h6>
                      </div><span class="text-muted"> 
                      {personalInformation? personalInformation.middleName : null}
                      </span></li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed"><div><h6 class="my-0">Grand Father Name</h6>
                    </div>
                      <span class="text-muted"> {personalInformation? personalInformation.lastName : null}</span></li>

                    <li class="list-group-item d-flex justify-content-between">
                      <h6>Phone Number</h6>
                      <strong>{personalInformation? personalInformation.phoneNumber:null}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                      <h6>Application Number</h6>
                      <strong>{personalInformation? personalInformation.applicationNumber:null}</strong>
                    </li>

                    <li class="list-group-item d-flex justify-content-between">
                      <h6>{personRequestdata.type==='New'? 'Appointment':'Delivery'} Date</h6>
                      <strong>{personRequestdata?(personRequestdata.type==='New'?(appointmentInformation?(dateFormatter(appointmentInformation.date)):null):personalInformation?dateFormatter(personalInformation.deliveryAppointment):null):null}</strong>
                    </li>
                 
                   {personRequestdata.type==='New'? <li class="list-group-item d-flex justify-content-between">
                      <h6>Appointment Time</h6>
                      <strong>{appointmentInformation? appointmentInformation.duration.startTime + '-' + appointmentInformation.duration.endTime:null}</strong>
                    </li>:null}
                  </ul>
              <ul class="list-group mb-3">
                <li class="list-group-item ePassprt-color"><h5>Pricing Information</h5></li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Selected Payment Option</h6>
                  </div><span class="text-muted"> 
                  {paymentInformation? paymentInformation.paymentOptionName:null}
                  </span></li>
            

                <li class="list-group-item d-flex justify-content-between lh-condensed"><div>
                  <h6 class="my-0">Order code</h6>
                </div>
                  <span class="text-muted">{paymentInformation? paymentInformation.orderId:null}</span></li>

                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <h6>Amount</h6>
                  <strong>{paymentInformation? paymentInformation.amount:null}</strong>
                </li>
              </ul>
            </div>
         
           
            
          </div>
        </div>
      </div>
    </>
  );
}
export default InstructionPage;