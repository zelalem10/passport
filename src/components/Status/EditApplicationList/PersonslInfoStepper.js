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
import { isValid, parse } from 'date-fns';
import Spinner from '../../common/Spinner';
import axiosInstance from '../../Utils/axios';

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
const dateFormatter = (date) => {
    if(date && typeof(date)!=='undefined'){
    let selectDays = new Date(date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(selectDays);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(selectDays);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(selectDays);
    return (`${mo} ${da}, ${ye}`);
    }
}
function getSteps() {
    return ['Personal Detail', 'Address', 'Family', 'Travel plan', 'Attachment'];
}

export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [displayAlert, setDisplayAlert] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setloading] = useState(false);


    const steps = getSteps();

    const dispatch = useDispatch();

    const counter = useSelector((state) => state);
    const appList = counter.applicationList[counter.applicationList.length - 1];
    let displayedApplication = {};
    const { displayRequestId, backToList, status } = props;

    displayedApplication = appList;
const requiredAttachements=displayedApplication?displayedApplication.requiredAttachements:null;
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
        if (activeStep == 0 || activeStep == 1 || activeStep == 3) {
            const isValid = childRef.current.Validate();
            if (isValid == true) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setResponseMessage('');
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    function getFormatedDate(date){
        if(date && typeof(date)!=='undefined'){
    
        let dateToFormat= new Date(date);
      let formatedYear = dateToFormat.getFullYear();
      let formatedMonth = (1 + dateToFormat.getMonth()).toString();
      formatedMonth =
        formatedMonth.length > 1 ? formatedMonth : '0' + formatedMonth;
      let formatedDay = dateToFormat.getDate().toString();
      formatedDay = formatedDay.length > 1 ? formatedDay : '0' + formatedDay;
      let stringDateValue = `${formatedYear}-${formatedMonth}-${formatedDay}`;
      return stringDateValue;
        }
        return null;
    }

    const handleFinish = () => {
        const travelPlan = childRef.current.saveData();
        const isValid = childRef.current.Validate();
        setloading(true);

        if (isValid != true) {
            //setResponseMessage("Ple")
            setloading(false);
        } else {

            var personalInfo =
                counter.personalInfoReducer[counter.personalInfoReducer.length - 1];

            var addressInfo = counter.address[counter.address.length - 1];
            var familyInfo =
                counter.editFamilyData[counter.editFamilyData.length - 1];
            //var travelPlanInfo = counter.travelPlan[counter.travelPlan.length - 1];


          

            const requestBody = {
                requestId: displayedApplication.requestId,
                requestMode: displayedApplication.requestMode,
                requestTypeId: displayedApplication.requestTypeId,

                status: 0,

                confirmationNumber: displayedApplication.confirmationNumber,

                applicants: [
                    {
                        personId: personalInfo ? personalInfo.id : null,

                        firstName: personalInfo
                            ? personalInfo.firstName.toUpperCase()
                            : null,

                        middleName: personalInfo
                            ? personalInfo.middleName.toUpperCase()
                            : null,

                        lastName: personalInfo ? personalInfo.lastName.toUpperCase() : null,

                        geezFirstName: personalInfo ? personalInfo.geezFirstName : null,
                        geezMiddleName: personalInfo ? personalInfo.geezMiddleName : null,
                        geezLastName: personalInfo ? personalInfo.geezLastName : null,

                        dateOfBirth: personalInfo ? (personalInfo.dateOfBirth?getFormatedDate(personalInfo.dateOfBirth):null) : null,

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
                        photoPath: '',

                        employeeID: '',

                        applicationNumber: '',

                        organizationID: '',

                        isUnder18: personalInfo ? personalInfo.isUnder18 : false,

                        isAdoption: personalInfo ? personalInfo.isAdoption : false,
                        maritalStatus: personalInfo ? parseInt(personalInfo.maritalStatusEnum) : 0,
                        // passportPageId: travelPlan
                        //     ? parseInt(travelPlan.passportPageId)
                        //     : null,
                        passportPageId:1,
                        passportNumber: travelPlan
                            ? travelPlan.passportNumber
                            : null,
                        issueDate: travelPlan ? travelPlan.issueDate?getFormatedDate(travelPlan.issueDate):null : null,
                        expireDate: travelPlan ? travelPlan.expireDate?getFormatedDate(travelPlan.expireDate):null : null,
                        passportType: travelPlan ? travelPlan.passportType : null,
                        correctionType:travelPlan?parseInt(travelPlan.correctionReason):null,
                        isDatacorrected: travelPlan
                            ? travelPlan.isDatacorrected
                            : false,
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
                            kebele: addressInfo ? addressInfo.kebele : null,
                        },

                        familyRequests: familyInfo,
                    },
                ],
            };
            console.log(JSON.stringify(requestBody));
            axiosInstance.put('/Request/api/V1.0/Request/UpdateRequest',requestBody)

                .then((todo) => {
                    debugger;
                    setloading(false);
                    handleNext();
                    setResponseMessage('');

                })

                .catch((err) => {
                    debugger;
                    setloading(false);
                    setResponseMessage(err.response.data.Message);
                });
        }
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
                        resMessage={responseMessage}
                    />
                );

            case 4:
                return (
                    <Attachment
                        ref={childRef}
                        displayedApplication={displayedApplication}
                        personalInformation={personalInformation}
                        requiredAttachements={requiredAttachements}
                    />
                );

            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <div>
            {loading ? <Spinner /> :
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
                                        {dateFormatter(new Date(displayedApplication.requestDate))}
                                    </label>
                                </b>
                            </div>
                            <div class="form-group form-inline passport-display">
                                <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                    {displayedApplication.type === 'New' ? 'Appointment' : 'Delivery'} Date:{' '}
                                </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <b>
                                    <label class="font-weight-bold">
                                        {displayedApplication.appointmentResponse ? dateFormatter(displayedApplication.appointmentResponse.date) : personalInformation ? dateFormatter(personalInformation.deliveryAppointment) : null}

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
                                                                onClick={backToList}
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


                                                {activeStep === steps.length - 2 ? (
                                                    <Grid item xs={1}>
                                                        <div className="multistep-form__step">
                                                            <a
                                                                class="specialty-next-step button float-right vertical-margin-2"
                                                                onClick={handleFinish}
                                                            >
                                                                {' '}
                          Finish
                        </a>
                                                        </div>
                                                    </Grid>
                                                ) : activeStep !== steps.length - 1 ? (
                                                    <Grid item xs={1}>
                                                        <div className="multistep-form__step">
                                                            <a
                                                                class="specialty-next-step button float-right vertical-margin-2"
                                                                onClick={handleNext}
                                                            >
                                                                {' '}
                          Next <i class="fas fa-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </Grid>
                                                ) : <Grid item xs={3}>
                                                            <div className="multistep-form__step">
                                                                <a
                                                                    class="button hollow gray vertical-margin-2 ng-star-inserted"
                                                                    onClick={backToList}
                                                                >
                                                                    <i class="fas fa-arrow-right"></i> Back
                              <span class="show-for-medium">
                                                                        {' '}
                                To My Application List
                              </span>
                                                                </a>
                                                            </div>
                                                        </Grid>}
                                            </Grid>

                                        </div>
                                    )}
                            </div>
                        </div>
                    </MDBCard>
                </MDBContainer>
            }</div>);
}
