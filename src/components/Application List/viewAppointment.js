import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBadge } from 'mdbreact';
import './viewAppointment.css';
import { useSelector } from 'react-redux';
import { fi } from 'date-fns/locale';
import ViewGroupAppointment from './viewGroupAppointment';
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

export default function ViewAppointment(props) {
  const accesstoken = localStorage.systemToken;
  const [expanded, setExpanded] = React.useState('panel1');
  const data = useSelector((state) => state);
  const appList = data.applicationList[data.applicationList.length - 1];
  let displayedApplication = {};
  const getOccupation = (id) => {
    debugger;
    let occupations = JSON.parse(localStorage.occupations);
    for (let index = 0; index < occupations.length; index++) {
      if (occupations[index].id == id) {
        return occupations[index].title;
      }
    }
  };
  const getFamilyType = (id) => {
    let FamilyTypes = JSON.parse(localStorage.familyTypesResponse);
    for (let index = 0; index < FamilyTypes.length; index++) {
      if (FamilyTypes[index].id == id) {
        return FamilyTypes[index].type;
      }
    }
  };
  const getNationalitys = (id) => {
    let Nationalitys = JSON.parse(localStorage.nationalitys);
    for (let index = 0; index < Nationalitys.length; index++) {
      if (Nationalitys[index].id == id) {
        return Nationalitys[index].name;
      }
    }
  };

  const { displayRequestId } = props;
  const backToList = () => {
    window.location.href = '/Application-List';
  };
  for (let item in appList) {
    if (appList[item].requestId == displayRequestId) {
      displayedApplication = appList[item];
    }
  }
  const personalInformation = displayedApplication.personResponses;
  let requestPersonId;
  let attachmentlength;
  const [attachment, setattachment] = useState([]);
  let atachmentsample = [];

  if (personalInformation) {
    // if (personalInfo.length === 1) {
    const personalInformation = displayedApplication.personResponses;
    const addressInformation = personalInformation.address;
    const familyInformation = personalInformation.familyResponses;

    requestPersonId = personalInformation.requestPersonId;

    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/GetAttachment',
      params: { personRequestId: requestPersonId },
    })
      .then((Response) => {
        attachmentlength = Response.data.attachments.length;

        for (let i = 0; i < attachmentlength; i++) {
          atachmentsample.push(Response.data.attachments[i]);
        }
        setattachment(atachmentsample);
        console.log(attachment);
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
                  {displayedApplication.appointmentResponse.date}
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
                      {getNationalitys(personalInformation.nationalityId)}
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
                      {getOccupation(personalInformation.occupationId)}
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
              </fieldset>
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
              </fieldset>
            </div>

            <div className="col-md-6">
              {familyInformation.length !== 0 ? (
                <fieldset>
                  <legend class="text-primary">Family Information</legend>
                  <hr class="text-primary" />
                  {familyInformation.map((family) => (
                    <div class="form-group form-inline">
                      <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                        {getFamilyType(family.familtyTypeId)}
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
              <fieldset>
                <ul class="list-group mb-3">
                  <li class="list-group-item ePassprt-color">
                    <h5>Attachment Information</h5>
                  </li>
                  {attachment.length ? (
                    attachment.map((attachmentitem) => (
                      <li class="list-group-item d-flex justify-content-between">
                        <span>{attachmentitem.attachmentType} </span>
                        <strong>
                          <a href={attachmentitem.attachmentPath}>View File</a>
                        </strong>
                      </li>
                    ))
                  ) : (
                    <h6 class="my-3">
                      <MDBBadge color="warning p-3">
                        You Don't Have Attachment Information
                      </MDBBadge>
                    </h6>
                  )}
                </ul>
              </fieldset>
            </div>
          </div>
          <MDBRow>
            <MDBCol className="medium-12">
              <div className="text-center mb-3 signUpbutton ">
                <MDBBtn
                  type="submit"
                  className="btn btn-info float-left ml-4"
                  onClick={backToList}
                >
                  Back To My Application List
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    );
  }
}
