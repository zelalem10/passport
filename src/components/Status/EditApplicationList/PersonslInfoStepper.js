import React, { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';

import Step from '@material-ui/core/Step';

import StepLabel from '@material-ui/core/StepLabel';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import PersonalInfo from './PersonalInfo';

import AddressInfo from './Address';

import Attachment from './Attachement';

import TravelPlan from './TravelPlan';

import FamilyInformation from './family/familyInformation';

import { useDispatch, useSelector } from 'react-redux';

import API from '../../Utils/API';
import { MDBContainer, MDBCard, MDBAlert } from 'mdbreact';
import { parse } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },

  backButton: {
    marginRight: theme.spacing(1),
  },

  instructions: {
    marginTop: theme.spacing(1),

    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Personal Detail', 'Address', 'Family', 'Travel plan', 'Attachment'];
}

export default function HorizontalLabelPositionBelowStepper(props) {
   ;
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [displayAlert, setDisplayAlert] = useState('');

  const steps = getSteps();

  const dispatch = useDispatch();

  const counter = useSelector((state) => state);
  const appList = counter.applicationList[counter.applicationList.length - 1];
  let displayedApplication = {};
  const { displayRequestId } = props;

  displayedApplication = appList;

  const personalInformation = displayedApplication
    ? displayedApplication.personResponses
    : null;
  const personId = personalInformation ? personalInformation.id : null;
  const addressInformation = personalInformation
    ? personalInformation.address
    : null;
  const familyInformation = personalInformation
    ? personalInformation.familyResponses
    : null;

  const childRef = useRef();

  const handleNext = () => {
    childRef.current.saveData();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const backToApplicationList = () => {
    window.location.href = '/Application-List';
  };

  const handleFinish = () => {
    var personalInfo =
      counter.personalInfoReducer[counter.personalInfoReducer.length - 1];

    var addressInfo = counter.address[counter.address.length - 1];
    var familyInfo = counter.editFamilyData[counter.editFamilyData.length - 1];
    var travelPlanInfo = counter.travelPlan[counter.travelPlan.length - 1];
    const accesstoken = localStorage.systemToken;

    const config = {
      headers: {
        Authorization: 'Bearer ' + accesstoken,
      },
    };

    const requestBody = {
      requestId: displayedApplication.requestId,
      requestMode: displayedApplication.requestMode,
      requestTypeId: displayedApplication.requestTypeId,

      status: 0,

      confirmationNumber: displayedApplication.confirmationNumber,

      personRequest: [
        {
          personId: personalInfo ? personalInfo.id : null,

          firstName: personalInfo ? personalInfo.firstName.toUpperCase() : null,

          middleName: personalInfo
            ? personalInfo.middleName.toUpperCase()
            : null,

          lastName: personalInfo ? personalInfo.lastName.toUpperCase() : null,

          geezFirstName: personalInfo ? personalInfo.geezFirstName : null,
          geezMiddleName: personalInfo ? personalInfo.geezMiddleName : null,
          geezLastName: personalInfo ? personalInfo.geezLastName : null,

          dateOfBirth: personalInfo ? personalInfo.dateOfBirth : null,

          gender: personalInfo ? parseInt(personalInfo.gender) : null,

          nationalityId: personalInfo
            ? parseInt(personalInfo.nationalityId)
            : null,
          occupationId: personalInfo
            ? parseInt(personalInfo.occupationId)
            : null,

          height: personalInfo ? personalInfo.height : null,

          eyeColor: personalInfo ? personalInfo.eyeColor : null,

          hairColor: personalInfo ? personalInfo.hairColor : null,

          isHalfCast: personalInfo ? personalInfo.isHalfCast : null,

          birthPlace: personalInfo ? personalInfo.birthPlace : null,

          phoneNumber: personalInfo ? personalInfo.phoneNumber : null,

          email: personalInfo ? personalInfo.email : null,
          birthCertificateId: personalInfo
            ? personalInfo.birthCertificateId
            : null,

          flightDate: travelPlanInfo.travelDate,
          flightNumber: travelPlanInfo.ticketNumber,
          photoPath: '',

          employeeID: '',

          applicationNumber: '',

          organizationID: '',

          isUnder18: personalInfo ? personalInfo.isUnder18 : false,

          isAdoption: personalInfo ? personalInfo.isAdoption : false,
          passportPageId: travelPlanInfo.passportPageId,

          address: {
            personId: personalInformation.id,

            id: addressInfo ? addressInfo.id : null,

            city: addressInfo ? addressInfo.city : null,

            region: addressInfo ? addressInfo.region : null,

            state: addressInfo ? addressInfo.state : null,

            zone: addressInfo ? addressInfo.zone : null,

            wereda: addressInfo ? addressInfo.wereda : null,

            street: addressInfo ? addressInfo.street : null,

            houseNo: addressInfo ? addressInfo.houseNo : null,

            poBox: addressInfo ? addressInfo.poBox : null,

            requestPlace: addressInfo ? addressInfo.requestPlace : null,
          },

          familyRequests: familyInfo,
        },
      ],
    };
    console.log(JSON.stringify(requestBody));
    API.put(
      'https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/UpdateRequest',
      requestBody,
      config
    )

      .then((todo) => {
        handleNext();
      })

      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <PersonalInfo
            ref={childRef}
            personalInformation={personalInformation}
          />
        );

      case 1:
        return (
          <AddressInfo ref={childRef} addressInformation={addressInformation} />
        );

      case 2:
        return (
          <FamilyInformation
            ref={childRef}
            familyInformation={familyInformation}
            personId={personId}
          />
        );

      case 3:
        return (
          <TravelPlan
            ref={childRef}
            passportRes={personalInformation.passportRes}
            personalInformation={personalInformation}
            displayedApplication={displayedApplication}
          />
        );

      case 4:
        return (
          <Attachment
            ref={childRef}
            displayedApplication={displayedApplication}
            personalInformation={personalInformation}
          />
        );

      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <MDBContainer className="passport-container pt-3" fluid>
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
      <MDBCard style={{ marginBottom: '1rem' }}>
        {displayAlert ? (
          <MDBAlert color="success">{displayAlert}</MDBAlert>
        ) : null}
        <div className={classes.root} style={{ marginBottom: '5rem' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>

                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    {activeStep === 0 ? (
                      <div className="multistep-form__step">
                        <a
                          class="button hollow gray vertical-margin-2 ng-star-inserted"
                          onClick={backToApplicationList}
                        >
                          <i class="fas fa-arrow-left"></i> Back
                          <span class="show-for-medium">
                            {' '}
                            To My Application List
                          </span>
                        </a>
                      </div>
                    ) : (
                      <div className="multistep-form__step">
                        <a
                          class="button hollow gray vertical-margin-2 ng-star-inserted"
                          onClick={handleBack}
                        >
                          <i class="fas fa-arrow-left"></i> Previous
                        </a>
                      </div>
                    )}
                  </Grid>

                  <hr></hr>

                  <Grid item xs={1}>
                    {activeStep === steps.length - 2 ? (
                      <div className="multistep-form__step">
                        <a
                          class="specialty-next-step button float-right vertical-margin-2"
                          onClick={handleFinish}
                        >
                          {' '}
                          Finish
                        </a>
                      </div>
                    ) : (
                      <div className="multistep-form__step">
                        <a
                          class="specialty-next-step button float-right vertical-margin-2"
                          onClick={handleNext}
                        >
                          {' '}
                          Next <i class="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </MDBCard>
    </MDBContainer>
  );
}
