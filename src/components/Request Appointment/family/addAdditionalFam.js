import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { useTranslation, Trans } from 'react-i18next';
function AddFamily(props) {
  const { t, i18n } = useTranslation();
  const { familyType } = props;
  return (
    <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
      <MDBRow>
        <MDBCol sm="12">
          <div className="multistep-form__step">
            <h2 className="h1"><h2 className="h1"><Trans>requestForm.familyDetails</Trans></h2></h2>
            <div className="accordion accordion--form">
              <form step="0" title="1. Family Details">
                <div className="accordion-item is-active" id="patient-raa-step">
                  <a className="accordion-title enabled">
                    <span className="accordion-title__text">
                      1. <Trans>requestForm.familyDetails</Trans>
                    </span>
                  </a>

                  <form className="mb-2">
                    <div className="row p-3">
                      <div className="small-12 medium-8 column">
                        <div className="grey-text">
                          <select
                            name="famType"
                            onChange={props.handleInputAdd}
                            className="browser-default custom-select"
                          >
                            <option style={{ display: 'none' }}>
                            {t('requestForm.selectFamilyType')}
                            </option>
                            {familyType.map((item) => (
                              <option value={item.id}>{item.type}</option>
                            ))}
                          </select>
                          <MDBInput
                            label={t('requestForm.firstname')}
                            group
                            name="fname"
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange={props.handleInputAdd}
                          />
                          <MDBInput
                          label={t('requestForm.middleName')}
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
                       
                        <span class="show-for-medium">
                          {' '}
                          {t('requestForm.addFamily')} <i class="fas fa-plus-circle"></i>
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
