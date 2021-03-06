import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdbreact';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

function InstructionPage(props) {
const {passportPage}=props;
  const data = useSelector((state) => state);

  let paymentInformation = data.paymentOption[data.paymentOption.length - 1];

  return (
    <>
      <div id="share-section" class="bg-light text-muted py-5">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="u-center-text u-margin-bottom-big">
                <h2 class="heading-secondary">Payment Instruction</h2>
              </div>
              <div class="alert alert-success my-4 p-3" role="alert">
                Thank you for making this request. Please visit the website to
                follow the status.
              </div>
              <h5 class="font-weight-bold u-center-text m3-5">
                Please follow step below to process payment
              </h5>
              {paymentInformation
                ? paymentInformation.instractions.length
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
                  : null
                : null}

<p class="">
                N.B : Please ensure that you make the extract payment within 2 hours after making the request. 
                

          </p>
          <p class="">
          If you do not get any SMS or email confirmation in 2 hours after marking the payment,  
          Please contact us by this email address: 
          <a href="mailto:support@ethiopianpassportservices.gov.et" class='ml-1'>
            <strong>
             support@ethiopianpassportservices.gov.et
             </strong>
             </a>
          </p>
            </div>

            <div class="col-md-4 order-md-2 mb-4 mt-5">
              <ul class="list-group mb-3">
                <li class="list-group-item ePassprt-color">
                  <h5>Pricing Information</h5>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Selected Payment Option</h6>
                  </div>
                  <span class="text-muted">{paymentInformation? paymentInformation.paymentOptionName:null}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Order code</h6>
                  </div>
                  <span class="text-muted">{paymentInformation.orderId}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Page quantity</h6>
                  </div>
                  <span class="text-muted">{passportPage}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Amount</span>
                  <strong>{paymentInformation.amount}</strong>
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
