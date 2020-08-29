import React, {useRef} from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';

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
  return ['Personal Detail', 'Address', 'Family','Travel plan', 'Attachment'];
}
export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

const dispatch = useDispatch();
const counter = useSelector((state) => state);

const personRef = useRef();
  const handleNext = () => {
    // personRef.current.saveData()
    // personRef.current.Validate()
    props.handeler()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleFinish=() =>{
    alert("Finish Here")
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo ref={personRef} applicantNumber={props.applicantNumber} />;
      case 1:
        return <AddressInfo />;
      case 2:
        return <FamilyInformation />;
      case 3:
        return <TravelPlan />;
      case 4:
        return <Attachment />;
      default:
        return 'Unknown stepIndex';
    }
  }
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
              {activeStep === steps.length - 1 ? (<Button variant="contained" color="primary" onClick={handleFinish}>
                 Finish
              </Button>) : (<Button variant="contained" color="primary" onClick={handleNext}>
                 Next
              </Button>)}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
