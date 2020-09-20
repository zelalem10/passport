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
import FamilyInformation from '../Request Appointment/family/familyInformation';
import { useDispatch, useSelector } from 'react-redux';
import addCommonData from '../../redux/actions/addCommonDataAction';

import API from '../Utils/API';

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
export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);

  const steps = getSteps();
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const childRef = useRef();
  const handleNext = () => {
    // if (activeStep == 0 || activeStep == 1 || activeStep == 3) {
    //   childRef.current.saveData();
    //   const isVilid = childRef.current.Validate();
    //   if (isVilid == true) {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   }
    // }
    // else {
      childRef.current.saveData();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //}
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSubmit = () => {
    var personalInfo =
      counter.personalInfoReducer[counter.personalInfoReducer.length - 1];
    var addressInfo = counter.address[counter.address.length - 1];
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTkyMTg5NTQsImV4cCI6MTU5OTIzMzM1NCwiaWF0IjoxNTk5MjE4OTU0fQ.XK2Y4z8ogsP7JK1ZKnetby59h-nBfeucciIbai6Ej6c`,
      },
    };
    const requestBody = {
      requestId: 0,
      requestMode: 0,
      requestTypeId: 2,
      userName: '',
      status: 0,
      confirmationNumber: '',
      applicants: [
        {
          personId: 0,
          firstName: personalInfo ? personalInfo.firstName : null,
          middleName: personalInfo ? personalInfo.middleName : null,
          lastName: personalInfo ? personalInfo.lastName : null,
          dateOfBirth: '2020-08-31T12:42:45.259Z',
          gender: personalInfo
            ? Number.parseInt(personalInfo.gender, 10)
            : null,
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
            personId: 0,
            addressId: 0,
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
          }, //,
          // familyRequests: [
          //   // {
          //   //   familyId: 0,
          //   //   personId: 0,
          //   //   familtyTypeId: 0,
          //   //   firstName: "string",
          //   //   lastName: "string"
          //   // }
          // ]
        },
      ],
    };
    debugger;
    API.post(
      'https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/NewRequest',
      requestBody,
      config
    )
      .then((todo) => {
        console.log(
          todo.data + ' id= ' + todo.data.personResponses[0].requestPersonId
        );
        alert(todo.data.message);
        const commonData = {
          requestPersonId: todo.data.personResponses[0].requestPersonId,
        };
        dispatch(addCommonData(commonData));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo ref={childRef} />;
      case 1:
        return <AddressInfo ref={childRef} />;
      case 2:
        return <FamilyInformation ref={childRef} />;
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
                {activeStep === steps.length - 2 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
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
