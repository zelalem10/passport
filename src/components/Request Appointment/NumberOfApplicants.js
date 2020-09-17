import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
function NumberOfApplicant(props) {
  const continueTo = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const backTo = (e) => {
    e.preventDefault();
    props.prevStep();
  };
  const { isItGroup } = props;
  return (
    <MDBContainer
      className="passport-container pt-3"
      id="request-an-appointment"
      fluid
    >
      <MDBRow>
        <MDBCol sm="12" lg="7">
          <div className="multistep-form__step">
            <h2 className="h1">Group Appointment - Number of Applicants</h2>

            <div class="applicants-select">
              <select
                className="browser-default custom-select applicants-select"
                onChange={(e) => props.handleChange(e)}
                value={props.values}
              >
                <option style={{ display: 'none' }}>
                  Number Of Applicants
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <a
              class="button hollow gray vertical-margin-2 ng-star-inserted"
              onClick={backTo}
            >
              <i class="fas fa-arrow-left"></i> Previous
              <span class="show-for-medium"> Screen</span>
            </a>
            <a
              class="specialty-next-step button float-right vertical-margin-2"
              onClick={continueTo}
            >
              {' '}
              Next <i class="fas fa-arrow-right"></i>
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
                          class="fas fa-phone fa-rotate-180"
                        ></i>{' '}
                        800-881-7385{' '}
                      </a>
                    </li>
                    <li>
                      <a href="tel:6147226200">
                        <span class="show-for-sr">Call us at:</span>
                        <i
                          aria-hidden="true"
                          class="fas fa-phone fa-rotate-180"
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
                <strong>Requestor:{isItGroup ? ' Group' : 'Individual'}</strong>
              </li>
            </ul>
          </div>
        </app-right-content>
      </MDBRow>
    </MDBContainer>
  );
}
export default NumberOfApplicant;
