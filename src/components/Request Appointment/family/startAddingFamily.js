import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { useTranslation, Trans } from 'react-i18next';
function AddFirstFamily(props) {
  const { t, i18n } = useTranslation();
  return (
    <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
      <MDBRow>
        <MDBCol className="addFamily" sm="12">
          <div className="multistep-form__step">
            <h2 className="h1"><Trans>requestForm.familyDetails</Trans></h2>
            <div className="d-flex flex-column">
              <div className="p-2 col-example text-left">
              <Trans>requestForm.noFamily</Trans>
              </div>
            </div>
            <a
              class="button hollow gray vertical-margin-2 "
              onClick={props.addFamilyHandle}
            >
       
              <span class="show-for-medium">
                {' '}
                {t('requestForm.addFamily')} <i class="fas fa-plus-circle"></i>
              </span>
            </a>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default AddFirstFamily;
