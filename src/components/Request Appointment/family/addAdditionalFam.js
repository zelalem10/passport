import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';

function AddFamily(props) {
  return (
    <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
      <MDBRow>
        <MDBCol className="medium-8" sm="12" lg="7">
          <div className="multistep-form__step">
            <h2 className="h1">Family Details</h2>
            <div className="accordion accordion--form">
              <form step="0" title="1. Family Details">
                <div className="accordion-item is-active" id="patient-raa-step">
                  <a className="accordion-title enabled">
                    <span className="accordion-title__text">
                      1. Family Details
                    </span>
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
                            onChange={props.handleInputAdd}
                          />
                          <MDBInput
                            label="Last Name"
                            name="lname"
                            group
                            type="text"
                            validate
                            onChange={props.handleInputAdd}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <a
                        class="button hollow gray vertical-margin-2 "
                        onClick={props.addAdditionalFamilyHandlerAdd}
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
}
export default AddFamily;
