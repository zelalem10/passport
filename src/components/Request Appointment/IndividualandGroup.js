import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { validate } from '@material-ui/pickers';
import { red } from '@material-ui/core/colors';
function IndividualandGroup(props) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [needValidation, setneedValidation] = useState(false);
  const continueTo = (e) => {
    props.nextStep(e);
  };
  const continueIndividual = (e) => {
    props.individualNextStep(e);
  };
  const handleAgrement = () => {
    setIsAgreed(!isAgreed);
    setneedValidation(false);
  };
  const validate = () => {
    setneedValidation(true);
  };
  return (
    <>
      <MDBContainer
        className="passport-container pt-3"
        id="request-an-appointment"
        fluid
      >
        <MDBRow>
          <MDBCol className="medium-8" sm="12" lg="7">
            <div className="multistep-form__step">
              <h2 className="h1">Request an Appointment</h2>

              <div className="rtf">
                <p>
                  Users accept the responsibility for supplying, checking, and
                  verifying the accuracy and correctness of the information they
                  provide. Incorrect or inaccurate information may result in
                  forfeiture of passport application.
                  <br />
                  <br />
                  All fees are non-refundable. Fees shall be forfeited for
                  applicants who fail to show up on their confirmed appointment,
                  applicants who cancel their appointment, applicants whose
                  application was rejected due to incorrect information.
                </p>
                <div>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="defaultChecked2"
                      onChange={() => handleAgrement()}
                    />
                    <label class="custom-control-label" for="defaultChecked2">
                      I agree to the terms and conditions
                    </label>
                    {needValidation ? (
                      <div className="text-monospace">
                        <p className="check-agree">
                          Please check this box if you want to proceed
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="row align-center vertical-margin-2">
                <div className="small-11 column">
                  <div class="request-card card card--small-gutters card--shadow text-center row">
                    <div class="small-12 medium-6 column">
                      <a
                        class="card card--link card--teal card--tile"
                        onClick={
                          isAgreed
                            ? () => continueIndividual('individual')
                            : () => validate()
                        }
                      >
                        <div class="card__content">
                          <i class="fas fa-user fa-7x"></i>
                          <p class="vertical-margin-1">
                            <span class="text-link--more-big text-link--light text-center">
                              Start Individual Appointment
                            </span>
                            <i class="fas fa-arrow-circle-right fa-2x arrow-icon-group"></i>
                          </p>
                        </div>
                      </a>
                    </div>
                    <div class="small-12 medium-6 column vertical-margin-1-small vertical-margin-0-medium">
                      <a
                        class="card card--link card--teal card--tile"
                        onClick={
                          isAgreed
                            ? () => continueTo('group')
                            : () => validate()
                        }
                      >
                        <div class="card__content">
                          <i class="fas fa-users fa-7x"></i>
                          <p class="vertical-margin-1">
                            <span class="text-link--more-big text-link--light text-center">
                              Start Group Appointment
                            </span>
                            <i class="fas fa-arrow-circle-right fa-2x arrow-icon-group"></i>
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <h4>Talk to an Appointment Scheduler</h4>
                <ul class="vertical-margin-0">
                  <li>
                    <ul class="list--no-bullets list--single-line list--border">
                      <li>
                        <a href="tel:8008817385">
                          <span class="show-for-sr">Call us at:</span>
                          <i class="fas fa-phone fa-rotate-180"></i>{' '}
                          800-881-7385{' '}
                        </a>
                      </li>
                      <li>
                        <a href="tel:6147226200">
                          <span class="show-for-sr">Call us at:</span>
                          <i class="fas fa-phone fa-rotate-180"></i>{' '}
                          614-722-6200{' '}
                        </a>
                      </li>
                      <li>
                        {' '}
                        7:30am – 5:30pm; Monday – Friday Eastern Time (ET).{' '}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </aside>
          </app-right-content>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
export default IndividualandGroup;
