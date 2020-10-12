import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
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
  return ['Personal Detail', 'Address', 'Family', 'Passport info', 'Attachment'];
}
const PersonalInfoStepper = forwardRef((props, ref) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(true);
  const [responseAlert, setResponseAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const steps = getSteps();
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const childRef = useRef();
  const accesstoken = localStorage.systemToken;
  const usertoken = localStorage.userToken;
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };
  const VerticalNext=()=>{
    props.Next();
  }
  const handleNext = () => {
    if (activeStep == 0 || activeStep == 1 || activeStep == 3) {
      childRef.current.saveData();
      const isVilid = childRef.current.Validate();
      if (isVilid == true) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else {
    childRef.current.saveData();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSubmit = () => {
    const travelPlan= childRef.current.saveData();
    const isVilid = childRef.current.Validate();
    if (isVilid != true) {
      //setResponseMessage("Ple")
    } else {
      const requestInfo = counter.request[counter.request.length-1];
      const personalInfoLength = counter.personalInfoReducer.filter(item => item.applicantNumber == props.applicantNumber).length;
      var personalInfo = counter.personalInfoReducer.filter(item => item.applicantNumber == props.applicantNumber)[personalInfoLength - 1]
      const addressLength = counter.address.filter(item => item.applicantNumber == props.applicantNumber).length;
      var addressInfo = counter.address.filter(item => item.applicantNumber == props.applicantNumber)[addressLength - 1];
      const travelPlanLength = counter.travelPlan.filter(item => item.applicantNumber == props.applicantNumber).length;
      //const travelPlan = counter.travelPlan.filter(item => item.applicantNumber == props.applicantNumber)[travelPlanLength - 1]
      const appointment=counter.appointmentDate[counter.appointmentDate.length - 1]
      let replacementReason=counter.replacment[counter.replacment.length -1]
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
    const siteInfo=counter.siteInformation[counter.siteInformation.length - 1]
    let isUrgent=counter.service[counter.service.length - 1].isUrgent;
      
      if (props.applicantNumber === 1) {
        let requestBody = {
          requestId: requestInfo ? Number.parseInt(requestInfo.requestId):0,
          requestMode: isUrgent===true?1:0,
          officeId: siteInfo? Number.parseInt(siteInfo.offceId, 10):0,
          deliverySiteId: siteInfo? Number.parseInt(siteInfo.deliverySiteId, 10):0,
          requestTypeId: 2,
          appointmentIds:appointment?[appointment[0].id] :[],
          userName: '',
          status: 0,
          confirmationNumber: '',
          applicants: [
            {
              personId: 0,
              firstName: personalInfo ? personalInfo.firstName.toUpperCase(): null,
              middleName: personalInfo ? personalInfo.middleName.toUpperCase(): null,
              lastName: personalInfo ? personalInfo.lastName.toUpperCase() : null,
              geezFirstName: personalInfo ? personalInfo.geezFirstName : null,
              geezMiddleName: personalInfo ? personalInfo.geezMiddleName : null,
              geezLastName: personalInfo ? personalInfo.geezLastName : null,
              dateOfBirth: personalInfo ? personalInfo.birthDate : null,
              gender: personalInfo ? Number.parseInt(personalInfo.gender, 10): null,
              nationalityId: personalInfo ? Number.parseInt(personalInfo.nationalityId, 10) : null,
              height: personalInfo ? personalInfo.height : null,
              eyeColor: personalInfo ? personalInfo.eyeColor : null,
              hairColor: personalInfo ? personalInfo.hairColor : null,
              occupationId: personalInfo ? Number.parseInt(personalInfo.occupationId, 10) : null,
              halfCast: personalInfo ? personalInfo.halfCast : null,
              enrolmentDate: personalInfo ? personalInfo.birthDate : null,
              birthCertificateId: personalInfo? personalInfo.birthCertificatNo: '',
              photoPath: '',
              employeeID: '',
              applicationNumber: '',
              organizationID: '',
              isUnder18: personalInfo ? personalInfo.isUnder18 : false,
              isAdoption: personalInfo ? personalInfo.isAdoption : false,
              passportNumber: travelPlan ? travelPlan.passportNumber : null,
              issueDate:  new Date(),
              expireDate:  new Date(),
              passportType: travelPlan ? travelPlan.passportType : null,
              isDatacorrected: travelPlan ? travelPlan.isDatacorrected : false,
              passportPageId: travelPlan ? Number.parseInt(travelPlan.pageQuantity, 10): 0,
              correctionType: travelPlan ? (travelPlan.correctionReason && travelPlan.correctionReason!="")?Number.parseInt(travelPlan.correctionReason, 10):0: 0,
              maritalStatus: personalInfo ? Number.parseInt(personalInfo.martialStatus, 10): 0,
              birthCertificateId: personalInfo? personalInfo.birthCertificatNo: null,
              phoneNumber: personalInfo? personalInfo.phoneNumber: null,
              email: personalInfo? personalInfo.email: null,
              requestReason:replacementReason? Number.parseInt(replacementReason.reasonForReplacment):0,
              address: {
                personId: 0,
                addressId: 0,
                city: addressInfo ? addressInfo.city : null,
                region: addressInfo ? addressInfo.region : null,
                state: addressInfo ? addressInfo.state : null,
                zone: addressInfo ? addressInfo.zone : null,
                wereda: addressInfo ? addressInfo.woreda : null,
                kebele: addressInfo ? addressInfo.kebele : null,
                street: addressInfo ? addressInfo.street : null,
                houseNo: addressInfo ? addressInfo.houseNo : null,
                poBox: addressInfo ? addressInfo.poBox : null,
                requestPlace: addressInfo ? addressInfo.requestPlace : null,
              },
              familyRequests: familyInfo,
            },
          ],
        };
      API.post('https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/SubmitRequest', requestBody, config)
        .then((todo) => {
          setResponseMessage(todo.data.message);
          setResponseAlert(true);
          setIsSuccess(true);
          const commonData = {
            requestPersonId: todo.data.serviceResponseList[0].personResponses.requestPersonId,
          };
          dispatch(newRequest(todo.data.serviceResponseList[0]));
          dispatch(addCommonData(commonData));
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((err) => {
          console.log('body=: ', requestBody);
          console.log('AXIOS ERROR: ', err.response);
          if (err.response != null)
            setResponseMessage(err.response.data.title);
          else
            setResponseMessage("something goes wrong!");
          setResponseAlert(true);
        });
    }
    else if (requestInfo != null) {
      
      let requestBody = {
        requestId: Number.parseInt(requestInfo.requestId),
        appointmentIds:appointment?[appointment[props.applicantNumber-1].id] :[],
        applicants: [
          {
            personId: 0,
            firstName: personalInfo ? personalInfo.firstName.toUpperCase(): null,
            middleName: personalInfo ? personalInfo.middleName.toUpperCase(): null,
            lastName: personalInfo ? personalInfo.lastName.toUpperCase() : null,
            geezFirstName: personalInfo ? personalInfo.geezFirstName : null,
            geezMiddleName: personalInfo ? personalInfo.geezMiddleName : null,
            geezLastName: personalInfo ? personalInfo.geezLastName : null,
            dateOfBirth: personalInfo ? personalInfo.birthDate : null,
            gender: personalInfo ? Number.parseInt(personalInfo.gender, 10): null,
            nationalityId: personalInfo ? Number.parseInt(personalInfo.nationalityId, 10) : null,
            height: personalInfo ? personalInfo.height : null,
            eyeColor: personalInfo ? personalInfo.eyeColor : null,
            hairColor: personalInfo ? personalInfo.hairColor : null,
            occupationId: personalInfo ? Number.parseInt(personalInfo.occupationId, 10) : null,
            halfCast: personalInfo ? personalInfo.halfCast : null,
            enrolmentDate: personalInfo ? personalInfo.birthDate : null,
            birthCertificateId: personalInfo? personalInfo.birthCertificatNo: '',
            photoPath: '',
            employeeID: '',
            applicationNumber: '',
            organizationID: '',
            isUnder18: personalInfo ? personalInfo.isUnder18 : false,
            isAdoption: personalInfo ? personalInfo.isAdoption : false,
            passportNumber: travelPlan ? travelPlan.passportNumber : null,
            issueDate:  new Date(),
            expireDate:  new Date(),
            passportType: travelPlan ? travelPlan.passportType : null,
            isDatacorrected: travelPlan ? travelPlan.isDatacorrected : false,
            passportPageId: travelPlan ? Number.parseInt(travelPlan.pageQuantity, 10): 0,
            correctionType: travelPlan ? (travelPlan.correctionReason && travelPlan.correctionReason!="")?Number.parseInt(travelPlan.correctionReason, 10):0: 0,
            maritalStatus: personalInfo ? Number.parseInt(personalInfo.martialStatus, 10): 0,
            birthCertificateId: personalInfo? personalInfo.birthCertificatNo: null,
            phoneNumber: personalInfo? personalInfo.phoneNumber: null,
            email: personalInfo? personalInfo.email: null,
            requestReason:replacementReason? Number.parseInt(replacementReason.reasonForReplacment):0,
            address: {
              personId: 0,
              addressId: 0,
              city: addressInfo ? addressInfo.city : null,
              region: addressInfo ? addressInfo.region : null,
              state: addressInfo ? addressInfo.state : null,
              zone: addressInfo ? addressInfo.zone : null,
              wereda: addressInfo ? addressInfo.woreda : null,
              kebele: addressInfo ? addressInfo.kebele : null,
              street: addressInfo ? addressInfo.street : null,
              houseNo: addressInfo ? addressInfo.houseNo : null,
              poBox: addressInfo ? addressInfo.poBox : null,
              requestPlace: addressInfo ? addressInfo.requestPlace : null,
            },
            familyRequests: familyInfo,
          },
        ],
      };
      API.post('https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/AddPerson',requestBody, config)
        .then((todo) => {
           ;
          //console.log("body ", JSON.parse(requestBody))
          setResponseMessage(todo.data.message);
          setResponseAlert(true);
          setIsSuccess(true);
          const commonData = {
            requestPersonId: todo.data.serviceResponseList[0].personResponses.requestPersonId,
          };
          dispatch(newRequest(todo.data.serviceResponseList[0]));
          dispatch(addCommonData(commonData));
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((err) => {
           ;
          // console.log('Body: ', requestBody);
          console.log('AXIOS ERROR: ', err.response);
          if (err.response != null)
            setResponseMessage(err.response.data.title);
          else
            setResponseMessage("something goes wrong!");
          setResponseAlert(true);
        });
    }
    else {
      alert("Please save the first Applicant")
    }
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
        return <TravelPlan 
         applicantNumber={props.applicantNumber}
         ref={childRef}
         resMessage={responseMessage}
         isSucces={isSuccess}
         respnseGet={responseAlert}/>;
      case 4:
        return <Attachment applicantNumber={props.applicantNumber} VerticalNext={VerticalNext} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  useImperativeHandle(ref, () => ({
    saveData(){
      //setDataSaved(true)
    },
    isCompleted() {
      return formCompleted;
    }
  }));

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
          isUploading===false?(
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
              {activeStep === steps.length - 1 ? (null)
            :(
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
                  activeStep === steps.length - 1 ?(null):(<Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>)
                )}
              </Grid>
            )}
             </Grid>

          </div>
          ):(null)
        )}
      </div>
    </div>
  );
});
export default PersonalInfoStepper
