import React, { useState, useEffect } from 'react';
import { Tab, Row, Col, Button, Card } from 'react-bootstrap';
import HorizontalStepper from './PersonslInfoStepper';
import { BsCheck } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../../../redux/actions/addPersonalInfoAction';
import { MDBContainer } from 'mdbreact';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

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
export default function GroupRequestStepper(props) {
  const [completedForms, setCompletedForms] = useState([false, false, false]);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthCountry: '',
    birthCity: '',
    birthDate: '',
    gender: '',
    height: '',
    eyeColor: '',
    hairColor: '',
    occupation: '',
    halfCast: '',
    enrolmentDate: '',
    nationality: '',
    formCompleted: false,
  });
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const [formCompleted, setFormCompleted] = useState(false);
  const prevInfo = counter.personalInfoReducer;
  const numberOfApplicants = props.numOfApplicants;
  const applicantList = [];

  const appList = counter.applicationList[counter.applicationList.length - 1];
  let displayedApplication = {};
  const { displayRequestId } = props;

  for (let item in appList) {
    if (appList[item].requestId == displayRequestId) {
      displayedApplication = appList[item];
    }
  }

  function handelNext() {
    console.log(counter.groupPersonalInfo);
  }
  const basicInformation = {
    requestId: displayedApplication.requestId,
    requestMode: displayedApplication.requestMode,
    requestTypeId: displayedApplication.requestTypeId,
    userName: displayedApplication.userName,
  };
  return (
    <MDBContainer
      className="passport-container view-appointment-group pt-3"
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
                {new Date(displayedApplication.appointementDate)
                  .toISOString()
                  .substr(0, 10)}
              </label>
            </b>
          </div>
        </div>
      </div>
      <Card className="pt-3">
        <Card.Header>Personal Info</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {displayedApplication.personResponses.map((applicant) => (
              <Accordion className="accordion-item">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  eventKey={applicant.id}
                >
                  <Typography className="accordion-title">
                    {applicant.firstName + ' ' + applicant.middleName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  eventKey={applicant.id}
                  className="group-edit"
                >
                  <HorizontalStepper
                    applicantNumber={applicant.id}
                    applicants={displayedApplication.personResponses}
                    handeler={handelNext}
                    basicInfo={basicInformation}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </blockquote>
        </Card.Body>
      </Card>
    </MDBContainer>
  );
}
