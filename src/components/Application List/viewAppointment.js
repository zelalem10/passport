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
    <MDBContainer className="mt-4 passport-container display-information" fluid>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Personal Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MDBRow className="personal-information">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">First Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.firstName}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.lastName}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Middle Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.middleName}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Date of Birth</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.dateOfBirth}
                disabled
              />
            </div>
          </MDBRow>
          <MDBRow className="personal-information">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Gender</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.gender}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Nationality</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.nationality}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Height</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.height}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Eye Color</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.eyeColor}
                disabled
              />
            </div>
          </MDBRow>
          <MDBRow className="personal-information">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Hair Color</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.hairColor}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Occupation</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.occupation}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Half Cast</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.halfCast}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Enrollment Date</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.enrolmentDate}
                disabled
              />
            </div>
          </MDBRow>
          <MDBRow className="personal-information">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Birth Country</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.birthCountry}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Birth City</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={personalInformation.birthCity}
                disabled
              />
            </div>
            <div className="multistep-form__step">
              <a class="specialty-next-step button float-right vertical-margin-2">
                {' '}
                Edit <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </MDBRow>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Address Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MDBRow className="personal-information">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Country</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.country}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">City</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.city}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">State</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.state}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Zone</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.zone}
                disabled
              />
            </div>
          </MDBRow>
          <MDBRow className="personal-information">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Wereda</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.wereda}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Street</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.street}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">HouseNo</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.houseNo}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">PoBox</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.poBox}
                disabled
              />
            </div>
          </MDBRow>
          <MDBRow className="personal-information">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.phoneNumber}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Email</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Request Place</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={addressInformation.requestPlace}
                disabled
              />
            </div>
            <div className="multistep-form__step">
              <a class="specialty-next-step button float-right vertical-margin-2">
                {' '}
                Edit <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </MDBRow>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Family Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MDBCardGroup>
            {familyInformation.map((family) => (
              <MDBCard className="mr-3">
                <MDBCardBody>
                  <MDBCardTitle tag="h5">
                    {family.firstName + ' ' + ' ' + family.lastName}
                  </MDBCardTitle>
                  <MDBCardText>{family.familtyType}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            ))}
          </MDBCardGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary
          aria-controls="panel4d-content"
          id="panel4d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Attachments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </MDBContainer>
  );
}
