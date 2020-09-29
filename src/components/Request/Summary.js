import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBTypography, MDBBox } from 'mdbreact';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { fi } from 'date-fns/locale';
import ViewGroupAppointment from './GroupSummary';
import { useHistory } from 'react-router-dom';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const ViewAppointment = forwardRef((props, ref) => {
  debugger;
  const history = useHistory();
  const [expanded, setExpanded] = React.useState('panel1');
  const [formCompleted, setFormCompleted] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const data = useSelector((state) => state);

  const serviceData = data.service[data.service.length - 1];
  const requestMode = serviceData.isUrgent;

  let displayedApplication = data.request[data.request.length - 1];
  const confirmInformation = (e) => {
    setFormCompleted(e.target.checked);
  };
  useImperativeHandle(ref, () => ({
    saveData() {
      setDataSaved(true);
      if (formCompleted && requestMode) {
        history.push('/Confirmation');
      }
    },
    isCompleted() {
      return formCompleted;
    },
  }));

  const personalInfo = displayedApplication
    ? displayedApplication.personResponses
    : null;
  if (personalInfo) {
    if (personalInfo.length === 1) {
      const appointmentResponse = displayedApplication.appointmentResponse;
      const personalInformation = displayedApplication.personResponses[0];
      const addressInformation = personalInformation.address;
      const familyInformation = personalInformation.familyResponses;

      const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

      return (
        <MDBContainer className="passport-container pt-5" fluid>
          <div class="div-title text-center mywizardcss pt-3 pb-3">
            <div className="header-display">
              <div class="form-group form-inline passport-display">
                <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                  Request Type:
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  <label class="font-weight-bold">
                    {displayedApplication.type}
                  </label>
                </b>
              </div>
              <div class="form-group form-inline passport-display">
                <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                  Request Status:
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  <label class="font-weight-bold">
                    {displayedApplication.requestStatus}
                  </label>
                </b>
              </div>
              <div class="form-group form-inline passport-display">
                <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                  Request Date:{' '}
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  <label class="font-weight-bold">
                    {new Date(displayedApplication.requestDate)
                      .toISOString()
                      .substr(0, 10)}
                  </label>
                </b>
              </div>
              <div class="form-group form-inline passport-display">
                <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                  Appointement Date:{' '}
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  <label class="font-weight-bold">
                    {displayedApplication.appointmentResponse.date}
                  </label>
                </b>
              </div>
              <div class="form-group form-inline passport-display">
                <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                  Appointement Time:{' '}
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  <label class="font-weight-bold">
                    {displayedApplication.appointmentResponse.startTime}
                    {'-'}
                    {displayedApplication.appointmentResponse.endTime}
                  </label>
                </b>
              </div>
            </div>
          </div>
          <div
            class="wizard-display setup-content"
            id="step-5"
            style={{ display: 'block' }}
          >
            <div class="row pt-4">
              <div class="col-md-6">
                <fieldset>
                  <legend class="text-primary">Personal Information</legend>
                  <hr class="text-primary" />
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      First Name
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.firstName}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Last Name
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.middleName}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Middle Name
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.lastName}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Geez First Name
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.geezFirstName}
                      </label>
                    </b>
                  </div>

                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Geez Middle Name
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.geezMiddleName}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Geez Last Name
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.geezLastName}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Date of Birth
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {new Date(personalInformation.dateOfBirth)
                          .toISOString()
                          .substr(0, 10)}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Gender
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.gender == 1 ? 'Male' : 'Female'}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Nationality
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.nationality}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Height
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.height}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Eye Color
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.eyeColor}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Hair Color
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.hairColor}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Occupation
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.occupation}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Half Cast
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.halfCast}
                      </label>
                    </b>
                  </div>

                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Birth Country
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.birthCountry}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Birth City
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.birthCity}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Phone Number
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.phoneNumber}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Email
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.email}
                      </label>
                    </b>
                  </div>
                </fieldset>
                {familyInformation.length !== 0 ? (
                  <fieldset>
                    <legend class="text-primary">Family Information</legend>
                    <hr class="text-primary" />
                    {familyInformation.map((family) => (
                      <div class="form-group form-inline">
                        <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                          {family.familtyType}
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>
                          <label
                            class="font-weight-bold"
                            id="AccommodationTyppe"
                          >
                            {family.firstName + ' ' + family.lastName}
                          </label>
                        </b>
                      </div>
                    ))}
                  </fieldset>
                ) : null}
              </div>

              <div className="col-md-6">
                <fieldset>
                  <legend class="text-primary">Address Information</legend>
                  <hr class="text-primary" />
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Country
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.country}
                      </label>
                    </b>
                  </div>

                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      City
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.city}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      State
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.state}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Zone
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.zone}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Wereda
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.wereda}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Street
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.street}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      HouseNo
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.houseNo}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      PoBox
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.poBox}
                      </label>
                    </b>
                  </div>

                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Request Place
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {addressInformation.requestPlace}
                      </label>
                    </b>
                  </div>
                </fieldset>
                <fieldset>
                  <legend class="text-primary">Attachments</legend>
                  <hr class="text-primary" />

                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      First Name
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold" id="newFirstName">
                        Yisacc
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Surname
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold" id="newSurName">
                        aberham
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Gender
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold" id="newGender">
                        male
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Date of Birth
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold" id="newBirthDate">
                        August 17 2020
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Country of Birth
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold" id="newCountryOfBirthId">
                        Albania
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Place of Birth
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold" id="newPlaceOfBirth">
                        ddddfd
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Address Country
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold" id="newAddressCountryId">
                        Ethiopia
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                      Address City
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <lable class="font-weight-bold" id="newAddressCity">
                        addis ababa
                      </lable>
                    </b>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <MDBTypography blockquote bqColor="primary">
            <MDBBox tag="p" mb={0} className="bq-title">
              Please review your application details.
            </MDBBox>
            <p>
              Please make sure these details exactly match the identity
              document.
            </p>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="defaultUnchecked"
                onClick={(e) => confirmInformation(e)}
              />
              <label class="custom-control-label" for="defaultUnchecked">
                Confirm Applicant Details
              </label>
            </div>
            {formCompleted === false && dataSaved === true ? (
              <div className="text-monospace">
                <p className="check-agree">
                  Please check this box if you want to proceed
                </p>
              </div>
            ) : null}
          </MDBTypography>
        </MDBContainer>
      );
    } else {
      return <ViewGroupAppointment />;
    }
  } else {
    return <div>Before request made</div>;
  }
});

export default ViewAppointment;
