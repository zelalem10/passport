import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useSelector } from 'react-redux';
import ViewGroupAppointment from './viewGroupAppointment';
import axiosInstance from '../Utils/axios';

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
const dateFormatter=(date)=>{
  if(date && typeof(date)!=='undefined'){
  let selectDays = new Date(date);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(selectDays);
 let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(selectDays);
 let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(selectDays);
 return (`${mo} ${da}, ${ye}`);
  }
 }
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);



export default function ViewAppointment(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const data = useSelector((state) => state);
  const [barcodeData,setBarcodeData]=useState({});
  const appList = data.applicationList[data.applicationList.length-1];
  let displayedApplication = {};
  const getOccupation = (id) => {
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

  
    const getBarcode=(requestId)=>{
    axiosInstance.get(`/Request/api/V1.0/Request/GetBarCode?requestId=${requestId}`)
            .then((response)=>{
              if(response.data.status===1){
                setBarcodeData(response.data);
              }
  
            })
            .catch((error)=>{
              console.log(error);
            })
    }
    
 

  const { displayRequestId, backToList } = props;

  for (let item in appList) {
    if (appList[item].requestId == displayRequestId) {
      displayedApplication = appList[item];
    }
  }
  
    if(displayedApplication.requestStatus==="Payment Completed" && !barcodeData.hasOwnProperty('barCode')){
      
      getBarcode(displayedApplication.requestId);
    }
  const personalInformation = displayedApplication
    ? displayedApplication.personResponses
    : false;

  if (personalInformation) {
    // if (personalInfo.length === 1) {
    const personalInformation = displayedApplication.personResponses;
    const addressInformation = personalInformation.address;
    const familyInformation = personalInformation.familyResponses;

    
    let attachementResponse =  personalInformation.attachmentList;

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (
      <MDBContainer className="passport-container" id="section-to-print" fluid>
        <MDBRow className="confirmation-print-btn no-print">
              <button class="print-button " onClick={() => window.print()}>
                <span class="pr-2">Print</span>
                <span class="print-icon"></span>
              </button>
            </MDBRow>
      <div class="div-title text-center mywizardcss pt-3 pb-3" >
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
              {dateFormatter(displayedApplication.requestDate)}
               
              </label>
            </b>
          </div>
          
          <div class="form-group form-inline passport-display">
            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
            {displayedApplication.type==='New'?'Appointment':'Delivery'} Date:{' '}
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <b>
              <label class="font-weight-bold">
              {displayedApplication.appointmentResponse ? dateFormatter(displayedApplication.appointmentResponse.date) :personalInformation?dateFormatter(personalInformation.deliveryAppointment):null}
                
              </label>
            </b>
          </div>
          {displayedApplication.appointmentResponse ? displayedApplication.appointmentResponse.duration ? (
                                    <div class="form-group form-inline passport-display">
                                        <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                            {displayedApplication.type === 'New' ? 'Appointment' : 'Delivery'} Time:{' '}
                                        </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>
                                            <label class="font-weight-bold">
                                                {displayedApplication.appointmentResponse
                                                    ? displayedApplication.appointmentResponse.duration.startTime
                                                    : null}
                                                {'-'}
                                                {displayedApplication.appointmentResponse
                                                    ? displayedApplication.appointmentResponse.duration.endTime
                                                    : null}
                                                {displayedApplication.appointmentResponse
                                                    ? displayedApplication.appointmentResponse.duration.isMorning
                                                        ? 'AM'
                                                        : 'PM'
                                                    : null}
                                            </label>
                                        </b>
                                    </div>
                                ) : null : null}
          <div class="form-group form-inline passport-display">
            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
            Application Number :{' '}
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <b>
              <label class="font-weight-bold">
              {displayedApplication.personResponses.applicationNumber}
              </label>
            </b>
          </div>
          <div class="form-group form-inline passport-display">
                  <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                    Office
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                    <label class="font-weight-bold">
                      {displayedApplication.office}
                    </label>
                  </b>
                </div>
                <div class="form-group form-inline passport-display">
                  <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                  Delivery Site
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                    <label class="font-weight-bold">
                      {displayedApplication.deliverySite}
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
                        Father Name
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
                    Grand Father Name
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
                      Geez Father Name
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
                      Geez Grand Father Name
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
                  {dateFormatter(personalInformation.dateOfBirth)}
                   
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
              
              <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                            Birth Certificate Id
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.passportRes.birthCertificateId}
                                                </label>
                                            </b>
                                        </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                    Is Adoption
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.isAdoption?'YES':'NO'}
                      </label>
                    </b>
                  </div>
                  <div class="form-group form-inline">
                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                    Is Under18
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      <label class="font-weight-bold">
                        {personalInformation.isUnder18?'YES':'NO'}
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
            
          </div>

          <div className="col-md-6">
          <fieldset>
              <legend class="text-primary">Address Information</legend>
              <hr class="text-primary" />
              <div class="form-group form-inline">
                <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                  Region
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  <label class="font-weight-bold">
                    {addressInformation.region}
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

            </fieldset>
            
            <fieldset>
                    <ul class="list-group mb-3">
                      <li class="list-group-item ePassprt-color">
                        <h5>Attachment Information</h5>
                      </li>
                      {
                      attachementResponse.length ? (
                        attachementResponse.map((attachmentitem) => (
                          <li class="list-group-item d-flex justify-content-between">
                            <span>{attachmentitem.attachmentType} </span>
                            <strong>
                              <a href={attachmentitem.attachmentPath}>
                                View File
                              </a>
                            </strong>
                          </li>
                        ))
                     
                        ) : (
                          <h6 class="my-3">
                          <div class="alert alert-danger" role="alert">
                          You Don't Have Attachment Information
                          </div>
                        </h6>
                      )}
                    </ul>
                  </fieldset>
                  {barcodeData.hasOwnProperty('barCode')?
          (<fieldset>
<img src={`data:image/jpeg;base64,${barcodeData.barCode}`} />
          <p class="pl-5">{barcodeData.data}</p>
          </fieldset>):null}
         
   </div>
        </div>
        <MDBRow className="no-print">
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
