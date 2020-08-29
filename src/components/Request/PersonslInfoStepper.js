import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PersonalInfo from './PersonalInfo'
import AddressInfo from './Address'
import Attachment from './Attachement'
import TravelPlan from './TravelPlan'
import FamilyInformation from '../Request Appointment/family/familyInformation';
import {  useSelector } from 'react-redux';

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
  
  return ['Personal Detail', 'Address', 'Attachment', 'Family','Travel plan'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <PersonalInfo />;
    case 1:
      return <AddressInfo />;
    case 2:
      return <Attachment />;
    case 3:
      return <FamilyInformation />;
    case 4:
      return <TravelPlan />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const counter = useSelector((state) => state);
  console.log(counter.service[counter.service.length - 1].isGroup);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root} style={{marginBottom: "5rem" }}>
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
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <Grid container spacing={1}>
            <Grid item xs={3} >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              </Grid>
              <hr></hr>
              <Grid  item xs={1}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
