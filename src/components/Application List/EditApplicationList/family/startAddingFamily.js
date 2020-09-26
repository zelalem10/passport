import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

function AddFirstFamily(props) {
  return (
    <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
      <MDBRow>
        <MDBCol className="addFamily" sm="12">
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
              Save
              <span class="show-for-medium">
                {' '}
                <i class="fas fa-plus-circle"></i>
              </span>
            </a>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default AddFirstFamily;
