import React from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

function FamilyInformation() {
  return (
    <MDBContainer className="passport-container pt-3" id="raa-form" fluid>
      <MDBRow>
        <MDBCol className="medium-8" sm="12" lg="7">
          <div className="multistep-form__step">
            <h2 className="h1">Family Details</h2>
            <div className="accordion accordion--form">
              <form step="0" title="1. Patient Details">
                <div className="accordion-item is-active" id="patient-raa-step">
                  <a className="accordion-title enabled">
                    <span className="accordion-title__text">
                      1. Patient Details
                    </span>
                    <button
                      aria-hidden="true"
                      className="accordion__button icon icon--expand"
                    >
                      <i class="fas fa-minus-circle fa-lg"></i>
                    </button>
                  </a>
                  <div className="accordion-content rtf">
                    <form className="form " novalidate="">
                      <div className="row">
                        <div className="small-12 medium-8 column">
                          <form
                            formcontrolname="firstName"
                            label="Child’s First Name"
                            maxlength="100"
                            required=""
                            className="ng-pristine ng-invalid ng-touched"
                          >
                            <label className="is-invalid-label">
                              <input
                                type="text"
                                name="firstName"
                                required=""
                                maxlength="100"
                                className="is-invalid-input"
                              />
                              <span className="floating-label ng-star-inserted"></span>
                              <span ame="is-invalid-label"></span>
                              <input
                                type="text"
                                name="firstName"
                                required=""
                                maxlength="100"
                                className="is-invalid-input"
                              />
                              <span className="floating-label ng-star-inserted">
                                <span className="label-text">
                                  Child’s First Name
                                </span>
                                <sup className="required-asterisk ng-star-inserted">
                                  *
                                </sup>
                              </span>
                              <span className="form-error ng-star-inserted">
                                Please answer to continue
                              </span>
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="row">
                        <div className="small-12 medium-8 column">
                          <form
                            formcontrolname="middleName"
                            label="Child’s Middle Name"
                            maxlength="100"
                            className="ng-pristine ng-valid ng-touched"
                          >
                            <label>
                              <input
                                type="text"
                                name="middleName"
                                maxlength="100"
                              />
                              <span className="floating-label ng-star-inserted">
                                <span className="label-text">
                                  Child’s Middle Name
                                </span>
                              </span>
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="row">
                        <div className="small-12 medium-8 column">
                          <form
                            formcontrolname="lastName"
                            label="Child’s Last Name"
                            maxlength="100"
                            required=""
                            className="ng-pristine ng-invalid ng-touched"
                          >
                            <label className="is-invalid-label">
                              <input
                                type="text"
                                name="lastName"
                                required=""
                                maxlength="100"
                                className="is-invalid-input"
                              />
                              <span className="floating-label ng-star-inserted">
                                <span className="label-text">
                                  Child’s Last Name
                                </span>{' '}
                                <sup className="required-asterisk ng-star-inserted">
                                  *
                                </sup>
                              </span>
                              <span className="form-error ng-star-inserted">
                                Please answer to continue
                              </span>
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="row">
                        <div className="small-12 medium-8 column">
                          <form
                            formcontrolname="preferredName"
                            label="Preferred Name (if different from legal name)"
                            maxlength="100"
                            className="ng-untouched ng-pristine ng-valid"
                          >
                            <label>
                              <span className="label-text ng-star-inserted">
                                Preferred Name (if different from legal name)
                              </span>
                              <input
                                type="text"
                                name="preferredName"
                                maxlength="100"
                              />
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="row vertical-margin-1">
                        <div className="small-12 medium-8 column">
                          <form
                            formcontrolname="dateOfBirth"
                            id="date"
                            isbirthdate=""
                            label="Child’s Date of Birth (MM/DD/YYYY)"
                            required=""
                            className="ng-untouched ng-pristine ng-invalid"
                          >
                            <label>
                              <span className="label-text ng-star-inserted">
                                Child’s Date of Birth (MM/DD/YYYY){' '}
                                <sup className="required-asterisk ng-star-inserted">
                                  *
                                </sup>
                              </span>
                              <input
                                type="text"
                                id="date"
                                name="dateOfBirth"
                                required=""
                                placeholder="__/__/____"
                              />
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="row vertical-margin-1">
                        <div className="small-12 column">
                          <form
                            formcontrolname="sex"
                            label="Sex"
                            required=""
                            className="ng-untouched ng-pristine ng-invalid"
                          >
                            <label>
                              <span className="label-text">Sex</span>{' '}
                              <sup className="required-asterisk ng-star-inserted">
                                *
                              </sup>
                              <div className="row collapse vertical-margin-half">
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="sex"
                                    id="sex-Female"
                                    value="Female"
                                    required=""
                                  />
                                  <label for="sex-Female">Female</label>
                                </div>
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="sex"
                                    id="sex-Male"
                                    value="Male"
                                  />
                                  <label for="sex-Male">Male</label>
                                </div>
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="sex"
                                    id="sex-Unknown/Uncertain"
                                    value="Unknown/Uncertain"
                                  />
                                  <label for="sex-Unknown/Uncertain">
                                    Unknown/Uncertain
                                  </label>
                                </div>
                              </div>
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="row vertical-margin-1">
                        <div className="small-12 column">
                          <form
                            formcontrolname="gender"
                            label="Gender Identity"
                            required=""
                            className="ng-untouched ng-pristine ng-invalid"
                          >
                            <label>
                              <span className="label-text">
                                Gender Identity
                              </span>{' '}
                              <sup className="required-asterisk ng-star-inserted">
                                *
                              </sup>
                              <div className="row collapse vertical-margin-half">
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="gender"
                                    id="gender-Female"
                                    value="Female"
                                    required=""
                                  />
                                  <label for="gender-Female">Female</label>
                                </div>
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="gender"
                                    id="gender-Male"
                                    value="Male"
                                  />
                                  <label for="gender-Male">Male</label>
                                </div>
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="gender"
                                    id="gender-Other"
                                    value="Other"
                                  />
                                  <label for="gender-Other">Other</label>
                                </div>
                              </div>
                            </label>
                          </form>
                        </div>
                      </div>

                      <div className="row vertical-margin-1">
                        <div className="small-12 column">
                          <form
                            formcontrolname="hasInsurance"
                            required=""
                            className="ng-untouched ng-pristine ng-invalid"
                          >
                            <label>
                              <span className="label-text">
                                Is the child covered by health insurance?
                              </span>{' '}
                              <sup className="required-asterisk ng-star-inserted">
                                *
                              </sup>{' '}
                              <span
                                aria-haspopup="true"
                                className="has-tip ng-star-inserted"
                                data-tooltip="oqhz1c-tooltip"
                                tabindex="1"
                                title=""
                                aria-describedby="n5owo2-tooltip"
                                data-yeti-box="n5owo2-tooltip"
                                data-toggle="n5owo2-tooltip"
                                data-resize="n5owo2-tooltip"
                              >
                                <img
                                  className="icon-info-circle"
                                  src="/frontend/assets/img/icon-info-circle.png"
                                />
                              </span>
                              <div className="row collapse vertical-margin-half">
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="hasInsurance"
                                    id="hasInsurance-Yes"
                                    value="Yes"
                                    required=""
                                  />
                                  <label for="hasInsurance-Yes">Yes</label>
                                </div>
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="hasInsurance"
                                    id="hasInsurance-No"
                                    value="No"
                                  />
                                  <label for="hasInsurance-No">No</label>
                                </div>
                              </div>
                            </label>
                          </form>
                        </div>
                      </div>
                      <div className="row vertical-margin-1">
                        <div className="small-12 medium-8 column">
                          <form
                            formcontrolname="hasPCP"
                            label="Does the child have a primary care doctor?"
                            required=""
                            usesmallyesno=""
                            className="ng-untouched ng-pristine ng-invalid"
                          >
                            <label>
                              <span className="label-text">
                                Does the child have a primary care doctor?
                              </span>{' '}
                              <sup className="required-asterisk ng-star-inserted">
                                *
                              </sup>
                              <div className="row collapse vertical-margin-half">
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="hasPCP"
                                    id="hasPCP-yes"
                                    value="yes"
                                    required=""
                                  />
                                  <label for="hasPCP-yes">Yes</label>
                                </div>
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="hasPCP"
                                    id="hasPCP-no"
                                    value="no"
                                  />
                                  <label for="hasPCP-no">No</label>
                                </div>
                              </div>
                            </label>
                          </form>
                        </div>
                      </div>

                      <div className="row vertical-margin-1">
                        <div className="small-12 medium-8 column">
                          <form
                            formcontrolname="seenAtNCH"
                            label="Has the child ever been seen at Nationwide Children's Hospital before?"
                            required=""
                            usesmallyesno=""
                            className="ng-untouched ng-pristine ng-invalid"
                          >
                            <label>
                              <span className="label-text">
                                Has the child ever been seen at Nationwide
                                Children's Hospital before?
                              </span>{' '}
                              <sup className="required-asterisk ng-star-inserted">
                                *
                              </sup>{' '}
                              <span
                                aria-haspopup="true"
                                className="has-tip ng-star-inserted"
                                data-tooltip="mtsj9j-tooltip"
                                tabindex="1"
                                title=""
                                aria-describedby="s2oird-tooltip"
                                data-yeti-box="s2oird-tooltip"
                                data-toggle="s2oird-tooltip"
                                data-resize="s2oird-tooltip"
                              >
                                <img
                                  className="icon-info-circle"
                                  src="/frontend/assets/img/icon-info-circle.png"
                                />
                              </span>
                              <div className="row collapse vertical-margin-half">
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="seenAtNCH"
                                    id="seenAtNCH-yes"
                                    value="yes"
                                    required=""
                                  />
                                  <label for="seenAtNCH-yes">Yes</label>
                                </div>
                                <div className="small-12 medium-4 vertical-margin-half vertical-margin-0-medium column ng-star-inserted">
                                  <input
                                    type="radio"
                                    name="seenAtNCH"
                                    id="seenAtNCH-no"
                                    value="no"
                                  />
                                  <label for="seenAtNCH-no">No</label>
                                </div>
                              </div>
                            </label>
                          </form>
                        </div>
                      </div>

                      <div className="row vertical-margin-2">
                        <div className="column">
                          <button className="button" type="submit" disabled="">
                            Next <i className="icon icon--arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default FamilyInformation;
