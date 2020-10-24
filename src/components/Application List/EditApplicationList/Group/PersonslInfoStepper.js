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
import API from '../../../Utils/API';
import '../../viewAppointment.css';

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
export default function HorizontalLabelPositionBelowStepperGroup(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const { basicInfo } = props;

  const steps = getSteps();
  const { applicants } = props;
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const childRef = useRef();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (
      activeStep == 0 ||
      activeStep == 1 ||
      activeStep == 2 ||
      activeStep == 3
    ) {
      childRef.current.saveData();
      //   const isVilid = childRef.current.Validate();
      //   if (isVilid == true) {
      //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
      //   }
      // } else {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    };

    const tokenValue = () => {
        const UserToken = localStorage.userToken;

        if (UserToken) {
            return UserToken;
        } else {
            const SystemToken = localStorage.systemToken;
            return SystemToken;
        }
    };

    const accesstoken = tokenValue();

  const config = {
    headers: {
      Authorization: 'Bearer ' + accesstoken,
    },
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSubmit = () => {
    const personalInfoLength = counter.personalInfoReducer.filter(
      (item) => item.id == props.applicantNumber
    ).length;

    let personalInfo = counter.personalInfoReducer.filter(
      (item) => item.id == props.applicantNumber
    )[personalInfoLength - 1];

    const addressLength = counter.address.filter(
      (item) => item.applicantNumber == props.applicantNumber
    ).length;

    let addressInfo = counter.address.filter(
      (item) => item.applicantNumber == props.applicantNumber
    )[addressLength - 1];
    const familyLength = counter.editFamilyData.filter(function (items) {
      for (let item in items) {
        if (items[item].personId == props.applicantNumber) {
          return items;
        }
      }
    }).length;
    let familyInfo = counter.editFamilyData.filter(function (items) {
      for (let item in items) {
        if (items[item].personId == props.applicantNumber) {
          return items;
        }
      }
    })[familyLength - 1];
    const travelLength = counter.travelPlan.filter(
      (item) => item.applicantNumber == props.applicantNumber
    ).length;
    let travelInfo = counter.travelPlan.filter(
      (item) => item.applicantNumber == props.applicantNumber
    )[travelLength - 1];
    const requestBody = {
      requestId: basicInfo.requestId,

      requestMode: basicInfo.requestMode,

      requestTypeId: basicInfo.requestTypeId,

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

          dateOfBirth: personalInfo ? personalInfo.birthDate : null,

          gender: personalInfo ? parseInt(personalInfo.gender) : null,

          nationality: personalInfo ? personalInfo.nationality : null,

          height: personalInfo ? personalInfo.height : null,

          eyeColor: personalInfo ? personalInfo.eyeColor : null,

          hairColor: personalInfo ? personalInfo.hairColor : null,

          occupation: personalInfo ? personalInfo.occupation : null,

          halfCast: personalInfo ? personalInfo.halfCast : null,

          enrolmentDate: personalInfo ? personalInfo.enrolmentDate : null,

          birthPlace: personalInfo ? personalInfo.birthPlace : null,

          photoPath: '',

          employeeID: '',

          applicationNumber: '',

          organizationID: '',

          isUnder18: true,

          isAdoption: true,
          flightDate: travelInfo.travelDate,
          flightNumber: travelInfo.ticketNumber,

          address: {
            personId: addressInfo ? addressInfo.applicantNumber : null,

            id: addressInfo ? addressInfo.id : 0,

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
    console.log(requestBody);

    API.put(
      'https://epassportservicesaddt.azurewebsites.net/Request/api/V1.0/Request/UpdateRequest',
      requestBody,
      config
    )

      .then((todo) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })

      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <PersonalInfo
            ref={childRef}
            applicantNumber={props.applicantNumber}
            applicants={applicants}
          />
        );
      case 1:
        return (
          <AddressInfo
            ref={childRef}
            applicantNumber={props.applicantNumber}
            applicants={applicants}
          />
        );
      case 2:
        return (
          <FamilyInformation
            ref={childRef}
            applicantNumber={props.applicantNumber}
            applicants={applicants}
          />
        );
      case 3:
        return (
          <TravelPlan
            ref={childRef}
            applicantNumber={props.applicantNumber}
            applicants={applicants}
          />
        );
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
                {activeStep === 0 ? (
                  <div></div>
                ) : (
                  <div className="multistep-form__step">
                    <a
                      class="button hollow gray vertical-margin-2 ng-star-inserted"
                      onClick={handleBack}
                    >
                      <i class="fas fa-arrow-left"></i> Previous
                      <span class="show-for-medium"> Screen</span>
                    </a>
                  </div>
                )}
              </Grid>
              <hr></hr>
              <Grid item xs={1}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Finish
                  </Button>
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
  );
}
