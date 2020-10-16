import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { MDBContainer } from 'mdbreact';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { fi } from 'date-fns/locale';
import { faPeace } from '@fortawesome/free-solid-svg-icons';

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

export default function ViewGroupAppointment(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const data = useSelector((state) => state);

  let displayedApplication = data.request;



  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (<div>
    {displayedApplication.map((displayedApp)=>(
    <MDBContainer
      className="passport-container view-appointment-group pt-5"
      fluid
    >
      <div class="div-title text-center mywizardcss pt-3 pb-3">
        <div className="header-display">
          <div class="form-group form-inline passport-display">
            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
              Request Type:
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <b>
              <label class="font-weight-bold">
                {displayedApp ? displayedApp.type : null}
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
                {displayedApp
                  ? displayedApp.requestStatus
                  : null}
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
                {displayedApp
                  ? new Date(displayedApp.requestDate)
                      .toISOString()
                      .substr(0, 10)
                  : null}
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
                {displayedApp
                  ? displayedApp.appointmentResponse
                    ? displayedApp.appointmentResponse.date
                    : null
                  : null}
              </label>
            </b>
          </div>
        </div>
      </div>
      {displayedApp.personResponses ? (
          <Accordion className="accordion-item">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="accordion-title">
                {displayedApp.personResponses.firstName + ' ' + displayedApp.personResponses.middleName}
              </Typography>
            </AccordionSummary>
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
                          {displayedApp.personResponses.firstName}
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
                          {displayedApp.personResponses.middleName}
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
                          {displayedApp.personResponses.lastName}
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
                          {new Date(displayedApp.personResponses.dateOfBirth)
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
                          {displayedApp.personResponses.gender == 1 ? 'Male' : 'Female'}
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
                          {displayedApp.personResponses.nationality}
                        </label>
                      </b>
                    </div>
                    <div class="form-group form-inline">
                      <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                        Height
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                        <label class="font-weight-bold">{displayedApp.personResponses.height}</label>
                      </b>
                    </div>
                    <div class="form-group form-inline">
                      <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                        Eye Color
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                        <label class="font-weight-bold">
                          {displayedApp.personResponses.eyeColor}
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
                          {displayedApp.personResponses.hairColor}
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
                          {displayedApp.personResponses.occupation}
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
                          {displayedApp.personResponses.halfCast}
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
                          {displayedApp.personResponses.birthCountry}
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
                          {displayedApp.personResponses.birthCity}
                        </label>
                      </b>
                    </div>
                  </fieldset>
                  {displayedApp.personResponses.address ? (
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.country : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.city : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.state : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.zone : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.wereda : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.street : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.houseNo : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.poBox : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.phoneNumber : null}
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
                            {displayedApp.personResponses.address ? displayedApp.personResponses.address.email : null}
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
                            {displayedApp.personResponses.address
                              ? displayedApp.personResponses.address.requestPlace
                              : null}
                          </label>
                        </b>
                      </div>
                    </fieldset>
                  ) : null}
                </div>

                <div className="col-md-6">
                  {displayedApp.personResponses.familyResponses &&
                  displayedApp.personResponses.familyResponses.length !== 0 ? (
                    <fieldset>
                      <legend class="text-primary">Family Information</legend>
                      <hr class="text-primary" />
                      {displayedApp.personResponses.familyResponses.map((family) => (
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
                        <label
                          class="font-weight-bold"
                          id="newCountryOfBirthId"
                        >
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
                        <label
                          class="font-weight-bold"
                          id="newAddressCountryId"
                        >
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
          </Accordion>
        
      ) : (
        <div>
          <h4>The information has problem</h4>
        </div>
      )}
    </MDBContainer>
  ))}</div>);
}
