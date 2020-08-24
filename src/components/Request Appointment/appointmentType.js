import React from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

function AppointmetType(props) {
  const continueTo = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  const backTo = (e) => {
    e.preventDefault();
    props.prevStep();
  };
  const { handleAppointmentType } = props;
  const { isItGroup } = props;
  const { values } = props;
  return (
    <MDBContainer
      className="passport-container pt-3"
      id="request-an-appointment"
      fluid
    >
      <MDBRow>
        <MDBCol className="medium-8" sm="12" lg="7">
          <div className="multistep-form__step">
            <h2 className="h1">What type of appointment do you need?</h2>

            <div className="rtf"></div>
            <div className="row align-center vertical-margin-2">
              <div className="small-11 column request-type">
                <div class="request-card card card--small-gutters card--shadow text-center row ">
                  <a onClick={props.DoubleNextStep} class="small-12 column row card--link">
                    <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                      <strong>New Appointment</strong>
                      <div class="text-center vertical-margin-half">
                        <i class="fas fa-arrow-circle-right fa-lg"></i>
                      </div>
                    </div>
                    <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                      <p>
                        If your child will be a new patient with a given
                        department at Nationwide Children’s, please select this
                        type of appointment.
                      </p>
                      <p>
                        {' '}
                        We welcome patients who have a diagnosis and have
                        recently moved and need help with their transfer of
                        care.{' '}
                      </p>
                    </div>
                  </a>
                  <a
                    class="small-12 column row card--link vertical-margin-1"
                    onClick={
                      (() =>  handleAppointmentType('Replace'))
                    }
                  >
                    <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                      <strong>Replace Appointment</strong>
                      <div class="text-center vertical-margin-half">
                        <i class="fas fa-arrow-circle-right fa-lg"></i>
                      </div>
                    </div>
                    <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                      <p>
                        If your child has been seen by this department in the
                        past, please select this type of appointment.
                      </p>
                    </div>
                  </a>
                  <a onClick={props.DoubleNextStep} class="small-12 column row card--link vertical-margin-1">
                    <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                      <strong>Lost/Stolen Appointment</strong>
                      <div class="text-center vertical-margin-half">
                        <i class="fas fa-arrow-circle-right fa-lg"></i>
                      </div>
                    </div>
                    <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                      <p>
                        If your child has a diagnosis, problem or condition that
                        you would like to seek out additional pediatric expert
                        advice for, please select this type of appointment.
                      </p>
                    </div>
                  </a>
                  <a onClick={props.DoubleNextStep} class="small-12 column row card--link vertical-margin-1 ">
                    <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                      <strong>Correction Appointment</strong>
                      <div class="text-center vertical-margin-half">
                        <i class="fas fa-arrow-circle-right fa-lg"></i>
                      </div>
                    </div>
                    <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
                      <p>
                        International families should use this option to get in
                        touch with our welcome service team who can connect you
                        with a Nationwide Children’s expert to get you the
                        advice you need.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <a class="button hollow gray vertical-margin-2 " onClick={backTo}>
              <i class="fas fa-arrow-left"></i> Previous
              <span class="show-for-medium"> Screen</span>
            </a>
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
                        <i
                          aria-hidden="true"
                          class="icon icon--phone orange"
                        ></i>{' '}
                        800-881-7385{' '}
                      </a>
                    </li>
                    <li>
                      <a href="tel:6147226200">
                        <span class="show-for-sr">Call us at:</span>
                        <i
                          aria-hidden="true"
                          class="icon icon--phone orange"
                        ></i>{' '}
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
export default AppointmetType;
