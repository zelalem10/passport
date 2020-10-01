import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBTypography, MDBBox } from 'mdbreact';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { de, fi } from 'date-fns/locale';
import ViewGroupAppointment from './GroupSummary';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
  const accesstoken = localStorage.systemToken;
  const history = useHistory();
  const [expanded, setExpanded] = React.useState('panel1');
  const [formCompleted, setFormCompleted] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const data = useSelector((state) => state);

  const serviceData = data.service[data.service.length - 1];
  const requestMode = serviceData.isUrgent;

  let displayedApplication = data.request[data.request.length - 1];

  let requestPersonId;
  let attachmentlength;
  const [attachment, setattachment] = useState([]);

  let atachmentsample = [];


  
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
  debugger;
  const personalInfo = displayedApplication
    ? displayedApplication.personResponses
    : null;
  if (personalInfo) {
    debugger;
    const appointmentResponse = displayedApplication.appointmentResponse;
    const personalInformation = displayedApplication.personResponses;
    const addressInformation = personalInformation.address;
    const familyInformation = personalInformation.familyResponses;
    requestPersonId = personalInformation.requestPersonId;
   
    debugger;
    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url: 'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/GetAttachment',
      params: { personRequestId: requestPersonId },
    })
      .then((Response) => {

        attachmentlength = Response.data.attachments.length;

        for (let i = 0; i < attachmentlength; i++) {
          atachmentsample.push(Response.data.attachments[i]);

        }
        setattachment(atachmentsample)
        console.log(attachment)
      })
      .catch((err) => {
     
        console.log(err);
      });

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
                  {appointmentResponse ? appointmentResponse.date : null}
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
                  {appointmentResponse ? appointmentResponse.startTime : null}
                  {'-'}
                  {appointmentResponse ? appointmentResponse.endTime : null}
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
                        <label class="font-weight-bold" id="AccommodationTyppe">
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
              <ul class="list-group mb-3">
                      <li class="list-group-item ePassprt-color"><h5>Attachment Information</h5></li>
                {
                  attachment.length
                    ? attachment.map((attachmentitem) => (
       
 
                    <li class="list-group-item d-flex justify-content-between">
                          <span>{attachmentitem.attachmentType} </span>
                          <strong><a href={attachmentitem.attachmentPath} >View File</a></strong>
                    </li>
               

                    ))
                    : <h6>Please wait...</h6>
                }
              </ul>
              </fieldset>
</div>
          </div>
        </div>
        <MDBTypography blockquote bqColor="primary">
          <MDBBox tag="p" mb={0} className="bq-title">
            Please review your application details.
          </MDBBox>
          <p>
            Please make sure these details exactly match the identity document.
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
    return <div>Before request made</div>;
  }
});

export default ViewAppointment;
