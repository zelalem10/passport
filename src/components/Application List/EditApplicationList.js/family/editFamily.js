import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';

function EditFamily(props) {
  const { familyType } = props;
  return (
    <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
      <MDBRow>
        <MDBCol sm="12">
          <div className="multistep-form__step">
            <h2 className="h1">Family Details</h2>

            <div className="accordion accordion--form">
              <form step="0" title="Family Details">
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
                            name="fName"
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange={props.handleEditInput}
                            value={props.editFamilyData.fName}
                          />
                          <MDBInput
                            label="Last Name"
                            name="lName"
                            group
                            type="text"
                            validate
                            onChange={props.handleEditInput}
                            value={props.editFamilyData.lName}
                          />
                          <select
                            name="familtyTypeId"
                            onChange={props.handleEditInput}
                            value={props.editFamilyData.familtyTypeId}
                            className="browser-default custom-select"
                          >
                            <option style={{ display: 'none' }}>
                              Choose your option
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
                        onClick={() =>
                          props.saveEditedData(props.editFamilyData.idCardNum)
                        }
                      >
                        Save <i class="fas fa-plus-circle"></i>
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
export default EditFamily;
