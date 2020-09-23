import React, { useState, useRef } from 'react';
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
import FamilyInformation from './family/familyInformation';
import { useDispatch, useSelector } from 'react-redux';
import newRequest from '../../redux/actions/addNewRequestAction';
import API from '../Utils/API';
import addCommonData from '../../redux/actions/addCommonDataAction';



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
  return ['Personal Detail', 'Address', 'Family', 'Travel & passport info', 'Attachment'];
}
export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const steps = getSteps();
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const childRef = useRef();
  const accesstoken = localStorage.systemToken;
  const config = {
    headers: { Authorization: "Bearer " + accesstoken }
  };
  const handleNext = () => {
    if (activeStep == 0 || activeStep == 1 ||activeStep == 2 || activeStep == 3) {
      childRef.current.saveData();
      // const isVilid = childRef.current.Validate();
      // if (isVilid == true) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    // }
    // else {
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSubmit = () => {
    const requestInfo = counter.request;
     
      const personalInfoLength = counter.personalInfoReducer.filter(item => item.applicantNumber == props.applicantNumber).length;
      var personalInfo = counter.personalInfoReducer.filter(item => item.applicantNumber == props.applicantNumber)[personalInfoLength - 1]
      const addressLength = counter.address.filter(item => item.applicantNumber == props.applicantNumber).length;
      var addressInfo = counter.address.filter(item => item.applicantNumber == props.applicantNumber)[addressLength - 1];
      const travelPlanLength = counter.travelPlan.filter(item => item.applicantNumber == props.applicantNumber).length;
      const travelPlan = counter.travelPlan.filter(item => item.applicantNumber == props.applicantNumber)[travelPlanLength - 1]
      const appointment=counter.appointmentDate[counter.appointmentDate.length - 1]
      const familyLength = counter.familyReducer.filter(function (items) {
      for (let item in items) {
        if (items[item].applicantNumber == props.applicantNumber) {
          return items;
        }
      }
    }).length;
    let familyInfo = counter.familyReducer.filter(function (items) {
      for (let item in items) {
        if (items[item].applicantNumber == props.applicantNumber) {
          return items;
        }
      }
    })[familyLength - 1];
      const requestBody = {
        requestId: 0,
        requestMode: 0,
        requestTypeId: 2,
        appointmentId:appointment?appointment.id :1,
        userName: '',
        status: 0,
        confirmationNumber: '',
        applicants: [
          {
            personId: 0,
            firstName: personalInfo ? personalInfo.firstName.toUpperCase() : null,
            middleName: personalInfo ? personalInfo.middleName.toUpperCase() : null,
            lastName: personalInfo ? personalInfo.lastName.toUpperCase() : null,
            geezFirstName: personalInfo ? personalInfo.geezFirstName : null,
            geezMiddleName: personalInfo ? personalInfo.geezMiddleName : null,
            geezLastName: personalInfo ? personalInfo.geezLastName : null,
            dateOfBirth: personalInfo ? personalInfo.birthDate : null,
            gender: personalInfo ? Number.parseInt(personalInfo.gender, 10) : null,
            nationalityId: 1,
            height: personalInfo ? personalInfo.height : null,
            eyeColor: personalInfo ? personalInfo.eyeColor : null,
            hairColor: personalInfo ? personalInfo.hairColor : null,
            occupationId: 1,
            halfCast: personalInfo ? personalInfo.halfCast : null,
            enrolmentDate: personalInfo ? personalInfo.enrolmentDate : null,
            birthCertificateId: personalInfo ? personalInfo.birthCertificatNo : "",
            photoPath: "",
            employeeID: "",
            applicationNumber: "",
            organizationID: "",
            isUnder18: personalInfo ? personalInfo.isUnder18 : false,
            isAdoption: personalInfo ? personalInfo.isAdoption : false,
            passportNumber: travelPlan ? travelPlan.passportNumber : null,
            issueDate:  new Date(),
            expireDate:  new Date(),
            passportType:  travelPlan ? travelPlan.passportType : null,
            isDatacorrected:  travelPlan ? travelPlan.isDatacorrected : false,
            pageQuantity: travelPlan ? Number.parseInt(travelPlan.pageQuantity, 10) : false,
            maritalStatus: personalInfo ? Number.parseInt(personalInfo.martialStatus, 10) : null,
            birthCertificateId: personalInfo ? personalInfo.birthCertificatNo : null,
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
              requestPlace: addressInfo ? addressInfo.requestPlace : null
            },
            familyRequests: familyInfo,
          }
        ]
      };
      if (props.applicantNumber == 1) {
      API.post('https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/NewRequest', requestBody, config)
        .then((todo) => {
          dispatch(newRequest(todo.data))
          const commonData = {
            requestPersonId: todo.data.personResponses[0].requestPersonId,
          };
          dispatch(addCommonData(commonData));
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
          console.log('ERROR Title: ', err.data);
        });
    }
    else if (requestInfo != null) {
      const requestBody = {
        requestId: requestInfo[requestInfo.length - 1].requestId,
        flightNumber: "",
        flightDate: "2020-09-14T11:28:49.495Z",
        applicants: [
          {
            personId: 0,
            firstName: personalInfo ? personalInfo.firstName.toUpperCase() : null,
            middleName: personalInfo ? personalInfo.middleName.toUpperCase() : null,
            lastName: personalInfo ? personalInfo.lastName.toUpperCase() : null,
            geezFirstName: personalInfo ? personalInfo.geezFirstName : null,
            geezMiddleName: personalInfo ? personalInfo.geezMiddleName : null,
            geezLastName: personalInfo ? personalInfo.geezLastName : null,
            dateOfBirth: personalInfo ? personalInfo.birthDate : null,
            gender: personalInfo ? Number.parseInt(personalInfo.gender, 10) : null,
            nationalityId: 1,
            height: personalInfo ? personalInfo.height : null,
            eyeColor: personalInfo ? personalInfo.eyeColor : null,
            hairColor: personalInfo ? personalInfo.hairColor : null,
            occupationId: 1,
            halfCast: personalInfo ? personalInfo.halfCast : null,
            enrolmentDate: personalInfo ? personalInfo.enrolmentDate : null,
            birthCertificateId: personalInfo ? personalInfo.birthCertificatNo : "",
            photoPath: "",
            employeeID: "",
            applicationNumber: "",
            organizationID: "",
            isUnder18: personalInfo ? personalInfo.isUnder18 : false,
            isAdoption: personalInfo ? personalInfo.isAdoption : false,
            passportNumber: travelPlan ? travelPlan.passportNumber : null,
            issueDate:  travelPlan ? travelPlan.issueDate : null,
            expireDate:  travelPlan ? travelPlan.expirationDate : null,
            passportType:  travelPlan ? travelPlan.passportType : null,
            isDatacorrected:  travelPlan ? travelPlan.isDatacorrected : false,
            pageQuantity: travelPlan ? Number.parseInt(travelPlan.pageQuantity, 10) : false,
            maritalStatus: personalInfo ? Number.parseInt(personalInfo.martialStatus, 10) : null,
            birthCertificateId: personalInfo ? personalInfo.birthCertificatNo : null,
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
            },
            // familyRequests: familyInfo,
          },
        ],
      };
      API.post('https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/AddPerson', requestBody, config)
        .then((todo) => {
          console.log(todo.data)
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
    }
    else {
      alert("Please save the first Applicant")
    }
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo ref={childRef} applicantNumber={props.applicantNumber} />;
      case 1:
        return <AddressInfo ref={childRef} applicantNumber={props.applicantNumber} />;
      case 2:
        return <FamilyInformation ref={childRef} applicantNumber={props.applicantNumber} />;
      case 3:
        return <TravelPlan ref={childRef} applicantNumber={props.applicantNumber} />;
      case 4:
        return <Attachment />;
      default:
        return 'Unknown stepIndex';
    }
  }
  return (
    
    <div className={classes.root} style={{ marginBottom: "5rem" }}>
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
