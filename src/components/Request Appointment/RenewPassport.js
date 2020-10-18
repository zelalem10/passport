import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function RenewPassport(props) {
  const backTo = (e) => {
    props.prevStep(e);
  };

  const { isItGroup } = props;
  const { values } = props;
  return (
    <MDBContainer
      className="passport-container pt-3"
      id="request-an-appointment"
      fluid
    >
      <MDBRow>
        <MDBCol sm="12" lg="7">
          <app-doctor-type-step class="ng-trigger ng-trigger-stepTransitions ng-tns-c1-0 ng-star-inserted">
            <div class="multistep-form__step renew-passport-multistep">
              <h2 className="h1">Which type of Service you need?</h2>
              <div class="card card--small-gutters card--shadow vertical-margin-2">
                <a
                  class="small-12 column row card--link"
                  onClick={() => props.handleReplacmentReason(1)}
                >
                  <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                    <strong>Expired Passport</strong>
                    <div class="text-center vertical-margin-half">
                      <i class="fas fa-arrow-circle-right fa-lg"></i>
                    </div>
                  </div>
                  <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                    <p class="text-justify">
                      Expired passport, applicants are requested to schedule for
                      appointment. You receive confirmation via email or SMS.
                      Print the last page which has your appointment date and
                      time. Take the paper with you to your appointment
                      consular.
                    </p>
                  </div>
                </a>

                <a
                  class="small-12 column row card--link vertical-margin-1"
                  onClick={() => props.handleReplacmentReason(2)}
                >
                  <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                    <strong>Replacment of Valid Page Runout</strong>
                    <div class="text-center vertical-margin-half">
                      <i class="fas fa-arrow-circle-right fa-lg"></i>
                    </div>
                  </div>
                  <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                    <p class="text-justify">
                      Page runout (not expired) passport, applicants are
                      requested to schedule for appointment. You receive
                      confirmation via email or SMS. Print the last page which
                      has your appointment date and time. Take the paper with
                      you to your appointment consular.
                    </p>
                  </div>
                </a>

                <a
                  class="small-12 column row card--link vertical-margin-1"
                  onClick={() => props.handleReplacmentReason(3)}
                >
                  <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                    <strong>Damaged Passport</strong>
                    <div class="text-center vertical-margin-half">
                      <i class="fas fa-arrow-circle-right fa-lg"></i>
                    </div>
                  </div>
                  <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                    <p>
                      Damaged passport, applicants are requested to schedule for
                      appointment. You receive confirmation via email or SMS.
                      Print the last page which has your appointment date and
                      time. Take the paper with you to your appointment
                      consular.
                    </p>
                  </div>
                </a>
              </div>
              <div class="clear clearfix vertical-margin-2">
                <a class="button hollow gray ng-star-inserted" onClick={backTo}>
                  <i class="fas fa-arrow-left"></i> Previous
                </a>
              </div>
            </div>
          </app-doctor-type-step>
        </MDBCol>
        <app-right-content
          class="small-12 medium-4 large-offset-1 large-4 column sticky-container"
          data-sticky-container=""
          _nghost-kxs-c3=""
        >
          <aside
                            class="sidebar small sticky is-anchored is-at-top"
                            data-btm-anchor="request-an-appointment:bottom"
                            data-margin-top="2"
                            data-sticky="s2eunn-sticky"
                            data-sticky-on="medium"
                            data-top-anchor="180"
                            id="raa-sidebar"
                            data-resize="raa-sidebar"
                            data-mutate="raa-sidebar"
                            data-events="mutate"
                        >
                            <div class="sidebar__box sidebar__box--border ng-star-inserted">
                                <h4>
                                <Trans>requestAppointment.cardTiltle</Trans>  
                                    </h4>
                                        <ul class="list--no-bullets list--single-line list--border">
                                            <li>
                                                <a href="tel:8133">
                                                    <i class="fas fa-phone fa-rotate-180"></i>{' '}
                                                    8133 FREE CALL
                                                </a>
                                            </li>
                                            <li>
                                                <a href="mailto:support@ethiopianpassportservices.gov.et">
                                                    <i class="fas fa-envelope"></i>{' '}
                                                    support@ethiopianpassportservices.gov.et
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <Trans>requestAppointment.time</Trans>  
                                            </li>
                                        </ul>
                                   
                            </div>
                        </aside>
          <div class="multistep-form__details sidebar__box sidebar__box--border sidebar__box--teal ng-star-inserted">
            <h4>
              <span class="ng-star-inserted">Appointment Request</span>
            </h4>
            <ul class="list--no-indent list--no-bullets ng-star-inserted">
              <li>
                <strong>
                  Requestor:{isItGroup ? ' Group / ' + values : ' Individual'}
                </strong>
              </li>
            </ul>
          </div>
        </app-right-content>
      </MDBRow>
    </MDBContainer>
  );
}
export default RenewPassport;
