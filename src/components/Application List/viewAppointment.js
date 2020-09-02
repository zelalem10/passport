import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {
  MDBContainer,
  MDBRow,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBCard,
} from 'mdbreact';
import './viewAppointment.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';

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

export default function ViewAppointment(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const data = useSelector((state) => state);
  const appList = data.applicationList[0];
  let displayedApplication = {};
  const { displayRequestId } = props;

  for (let item in appList) {
    if (appList[item].requestId == displayRequestId) {
      displayedApplication = appList[item];
    }
  }

  const personalInformation = displayedApplication.personResponses[0];
  const addressInformation = personalInformation.address;
  const familyInformation = personalInformation.familyResponses;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <MDBContainer className="passport-container pt-3" fluid>
      <div class="div-title text-center mywizardcss pt-3">
        <h4>Request Type: {displayedApplication.type}</h4>
        <h4>Request Status: {displayedApplication.requestStatus}</h4>
        <h4>Request Date: {displayedApplication.requestDate}</h4>
        <h4>Appointement Date: {}</h4>
      </div>
      <div
        class="wizard-display setup-content"
        id="step-5"
        style={{ display: 'block' }}
      >
        <div class="row pt-4">
          <div class="col-md-8">
            <h4 class="text-primary">Personal Information</h4>
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
                Last Name
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
                Date of Birth
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label class="font-weight-bold">
                  {personalInformation.dateOfBirth}
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
                  {personalInformation.gender}
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
                Enrollment Date
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label class="font-weight-bold">
                  {personalInformation.enrolmentDate}
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

            <h4 class="text-primary">Address Information</h4>
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
                Phone Number
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label class="font-weight-bold">
                  {addressInformation.phoneNumber}
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
                  {addressInformation.email}
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

            <h4 class="text-primary">Family Information</h4>
            <hr class="text-primary" />

            <div class="form-group form-inline">
              <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                Accommodation Type
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label class="font-weight-bold" id="AccommodationTyppe">
                  Hotel
                </label>
              </b>
            </div>
            <div class="form-group form-inline">
              <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                Accommodation Name
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label class="font-weight-bold" id="AccommodationNamme">
                  dinner
                </label>
              </b>
            </div>
            <div class="form-group form-inline">
              <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                Accommodation City
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label class="font-weight-bold" id="AccommodationCitty">
                  Addis Ababa
                </label>
              </b>
            </div>
            <div class="form-group form-inline">
              <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                Accommodation Phone Number
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label class="font-weight-bold" id="AccommodationPhoneNumbber">
                  0937656015
                </label>
              </b>
            </div>
            <div class="form-group form-inline">
              <label
                asp-for="AccommodationStreetAddress"
                class="control-label col-sm-4 p-0 pr-2 justify-content-end"
              >
                Accommodation Street Address
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                <label
                  class="font-weight-bold"
                  id="AccommodationStreetAddrress"
                >
                  addis
                </label>
              </b>
            </div>

            <h4 class="text-primary">Attachments</h4>
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
          </div>
        </div>
      </div>
    </MDBContainer>
  );
}
