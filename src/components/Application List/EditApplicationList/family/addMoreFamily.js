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

function AddMoreFamily(props) {
  const { data, familyType } = props;
  debugger;
  console.log(data);
  return (
    <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
      <MDBRow>
        <MDBCol sm="12">
          <div className="multistep-form__step">
            <h2 className="h1">Family Details</h2>
            {data.map((item, index) => (
              <MDBCard reverse className="mb-2">
                <MDBCardBody cascade className="text-center">
                  <div className="accordion-title enabled">
                    <button
                      onClick={() => props.deleteThisFamily(item.id, index)}
                      aria-hidden="true"
                      className="accordion__button icon icon--expand"
                    >
                      <i class="fas fa-trash-alt fa-lg"></i>
                    </button>
                    <button
                      aria-hidden="true"
                      onClick={() => props.editThisFamily(item.id, index)}
                      className="accordion__button edit icon icon--expand"
                    >
                      <i class="fas fa-edit fa-lg"></i>
                    </button>
                  </div>
                  <MDBCardTitle>
                    {item.firstName + ' ' + item.lastName}
                  </MDBCardTitle>
                  <h5 className="indigo-text">
                    <strong> {item.familtyType}</strong>
                  </h5>
                </MDBCardBody>
              </MDBCard>
            ))}

            <div className="accordion accordion--form">
              <form step="0" title="Family Details">
                <div className="accordion-item is-active" id="patient-raa-step">
                  <a className="accordion-title enabled">
                    <span className="accordion-title__text">
                      Family Details
                    </span>
                  </a>

                  <form className="mb-2">
                    <div className="row p-3">
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
                          <select
                            name="famType"
                            onChange={props.handleInput}
                            className="browser-default custom-select"
                          >
                            <option style={{ display: 'none' }}>
                              Select family type
                            </option>
                            {familyType.map((item) => (
                              <option value={item.id}>{item.type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <a
                        class="button hollow gray vertical-margin-2 "
                        onClick={props.addAdditionalFamilyHandler}
                      >
                        Save
                        <span class="show-for-medium">
                          {' '}
                          <i class="fas fa-plus-circle"></i>
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
export default AddMoreFamily;
