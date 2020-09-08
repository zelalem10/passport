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
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  const dispatch = useDispatch();

  const counter = useSelector((state) => state);
  const appList = counter.applicationList[0];
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

  const handleFinish = () => {
    var personalInfo =
      counter.personalInfoReducer[counter.personalInfoReducer.length - 1];

    var addressInfo = counter.address[counter.address.length - 1];
    var familyInfo = counter.editFamilyData[counter.editFamilyData.length - 1];

    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTkxMTY1NjAsImV4cCI6MTU5OTEzMDk2MCwiaWF0IjoxNTk5MTE2NTYwfQ.6DRok4IPLKMYZcKvYQTrPU6F1Iq61fKoRqaprRpeYC4`,
      },
    };

    const requestBody = {
      // requestId: displayedApplication.requestId,
      requestMode: displayedApplication.requestMode,
      requestTypeId: 2,
      requestTypeId: displayedApplication.requestTypeId,

      userName: displayedApplication.user,

      status: 0,

      confirmationNumber: displayedApplication.confirmationNumber,

      flightDate: '2020-09-02T08:49:02.683Z',
      flightNumber: 'string',

      personRequest: [
        {
          personId: 8,

          firstName: personalInfo ? personalInfo.firstName : null,

          middleName: personalInfo ? personalInfo.middleName : null,

          lastName: personalInfo ? personalInfo.lastName : null,

          dateOfBirth: '2020-08-31T12:42:45.259Z',

          gender: personalInfo ? personalInfo.gender : null,

          nationality: personalInfo ? personalInfo.nationality : null,

          height: personalInfo ? personalInfo.height : null,

          eyeColor: personalInfo ? personalInfo.eyeColor : null,

          hairColor: personalInfo ? personalInfo.hairColor : null,

          occupation: personalInfo ? personalInfo.occupation : null,

          halfCast: personalInfo ? personalInfo.halfCast : null,

          enrolmentDate: '2020-08-31T12:42:45.259Z',

          birthCountry: personalInfo ? personalInfo.birthCountry : null,

          birthCity: personalInfo ? personalInfo.birthCity : null,

          photoPath: '',

          employeeID: '',

          applicationNumber: '',

          organizationID: '',

          isUnder18: true,

          isAdoption: true,

          address: {
            personId: personalInformation.id,

            addressId: 1,

            city: addressInfo ? addressInfo.city : null,

            country: addressInfo ? addressInfo.country : null,

            state: addressInfo ? addressInfo.state : null,

            zone: addressInfo ? addressInfo.zone : null,

            wereda: addressInfo ? addressInfo.woreda : null,

            street: addressInfo ? addressInfo.street : null,

            houseNo: addressInfo ? addressInfo.houseNo : null,

            poBox: addressInfo ? addressInfo.poBox : null,

            phoneNumber: addressInfo ? addressInfo.phoneNumber : null,

            email: addressInfo ? addressInfo.email : null,

            requestPlace: addressInfo ? addressInfo.requestPlace : null,
          },

          familyRequests: familyInfo,
        },
      ],
    };

    debugger;
    console.log(requestBody);
    API.put(
      'https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/UpdateRequest',
      requestBody,
      config
    )

      .then((todo) => {
        console.log(todo.data);
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
          />
        );

      case 3:
        return <TravelPlan ref={childRef} />;

      case 4:
        return <Attachment />;

      default:
        return 'Unknown stepIndex';
    }
  }

  return (
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
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
              </Grid>

              <hr></hr>

              <Grid item xs={1}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinish}
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
