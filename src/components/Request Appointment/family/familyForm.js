import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdbreact';

function FamilyForm(props) {
  const { data } = props;
  const { addAdditionalFamily } = props;

  if (props.doWeHaveFamily === true && addAdditionalFamily === false) {
    return (
      <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
        <MDBRow>
          <MDBCol className="medium-8" sm="12" lg="7">
            <div className="multistep-form__step">
              <h2 className="h1">Family Details</h2>
              <div className="accordion accordion--form">
                <form step="0" title="1. Family Details">
                  <div
                    className="accordion-item is-active"
                    id="patient-raa-step"
                  >
                    <a className="accordion-title enabled">
                      <span className="accordion-title__text">
                        1. Family Details
                      </span>
                      <button
                        aria-hidden="true"
                        className="accordion__button icon icon--expand"
                      >
                        <i class="fas fa-minus-circle fa-lg"></i>
                      </button>
                    </a>

                    <form className="mb-2">
                      <div className="row">
                        <div className="small-12 medium-8 column">
                          <div className="grey-text">
                            <MDBInput
                              label="First Name"
                              group
                              name="fname"
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              onChange={props.handleInput}
                            />
                            <MDBInput
                              label="Last Name"
                              name="lname"
                              group
                              type="text"
                              validate
                              onChange={props.handleInput}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <a
                          class="button hollow gray vertical-margin-2 "
                          onClick={props.addAdditionalFamilyHandler}
                        >
                          Add
                          <span class="show-for-medium">
                            {' '}
                            Family <i class="fas fa-plus-circle"></i>
                          </span>
                        </a>
                      </div>
                    </form>
                  </div>
                </form>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } else if (props.doWeHaveFamily === true && addAdditionalFamily === true) {
    return (
      <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
        <MDBRow>
          <MDBCol className="medium-8" sm="12" lg="7">
            <div className="multistep-form__step">
              <h2 className="h1">Family Details</h2>
              {data.map((item) => (
                <MDBCard reverse>
                  <MDBCardBody cascade className="text-center">
                    <MDBCardTitle>{item.lastName}</MDBCardTitle>
                    <h5 className="indigo-text">
                      <strong>Photography</strong>
                    </h5>
                    <MDBCardText>
                      Sed ut perspiciatis unde omnis iste natus sit voluptatem
                      accusantium doloremque laudantium, totam rem aperiam.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              ))}

              <div className="accordion accordion--form">
                <form step="0" title="Family Details">
                  <div
                    className="accordion-item is-active"
                    id="patient-raa-step"
                  >
                    <a className="accordion-title enabled">
                      <span className="accordion-title__text">
                        1. Family Details
                      </span>
                      <button
                        aria-hidden="true"
                        className="accordion__button icon icon--expand"
                      >
                        <i class="fas fa-minus-circle fa-lg"></i>
                      </button>
                    </a>

                    <form className="mb-2">
                      <div className="row">
                        <div className="small-12 medium-8 column">
                          <div className="grey-text">
                            <MDBInput
                              label="First Name"
                              group
                              name="fname"
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              onChange={props.handleInput}
                            />
                            <MDBInput
                              label="Last Name"
                              name="lname"
                              group
                              type="text"
                              validate
                              onChange={props.handleInput}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <a
                          class="button hollow gray vertical-margin-2 "
                          onClick={props.addAdditionalFamilyHandler}
                        >
                          Add
                          <span class="show-for-medium">
                            {' '}
                            Family <i class="fas fa-plus-circle"></i>
                          </span>
                        </a>
                      </div>
                    </form>
                  </div>
                </form>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } else {
    return (
      <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
        <MDBRow>
          <MDBCol className="medium-8 addFamily" sm="12" lg="7">
            <div className="multistep-form__step">
              <h2 className="h1">Family Details</h2>
              <div className="d-flex flex-column">
                <div className="p-2 col-example text-left">
                  You don't have added any Family yet please. Click the below
                  button to add family
                </div>
              </div>
              <a
                class="button hollow gray vertical-margin-2 "
                onClick={props.addFamilyHandle}
              >
                Add
                <span class="show-for-medium">
                  {' '}
                  Family <i class="fas fa-plus-circle"></i>
                </span>
              </a>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default FamilyForm;
