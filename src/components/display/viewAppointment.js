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
  MDBBtn,
  MDBCardImage,
} from 'mdbreact';
import './viewAppointment.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

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
                value="Yisacc"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Aberham"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Middle Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Markos"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Date of Birth</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="19/02/1997"
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
                value="Male"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Nationality</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Ethiopian"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Height</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="1.73 cm"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Eye Color</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Brown"
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
                value="Dark Black"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Occupation</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Developer"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Half Cast</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Brown"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Enrollment Date</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="17/08/2020"
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
                value="Ethiopia"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Birth City</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Emdiber"
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
                value="Ethiopia"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">City</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Addis Abeba"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">State</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Bole"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Zone</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="03"
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
                value="Ethiopia"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Street</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Addis Abeba"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">HouseNo</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Bole"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">PoBox</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="03"
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
                value="Ethiopia"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Email</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Addis Abeba"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Request Place</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value="Bole"
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
            <MDBCard className="mr-3">
              <MDBCardBody>
                <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </MDBCardText>
                <MDBBtn color="primary" size="md">
                  read more
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mr-3">
              <MDBCardBody>
                <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </MDBCardText>
                <MDBBtn color="primary" size="md">
                  read more
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mr-3">
              <MDBCardBody>
                <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </MDBCardText>
                <MDBBtn color="primary" size="md">
                  read more
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
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
