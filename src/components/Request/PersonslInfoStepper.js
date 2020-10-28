import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
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
import newRequest from '../../redux/actions/addNewRequestAction';
import API from '../Utils/API';
import addPriceInfo from '../../redux/actions/priceInfoAction';
import Spinner from '../common/Spinner';


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
    return [
        'Personal Detail',
        'Address',
        'Family',
        'Passport info',
        'Attachment',
    ];
}
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
const PersonalInfoStepper = forwardRef((props, ref) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [formCompleted, setFormCompleted] = useState(true);
    const [responseAlert, setResponseAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [response, setResponse] = useState({});
    const [personId, setPersonId] = useState(0);
    const [loading, setloading] = useState(false);

    const steps = getSteps();
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    const childRef = useRef();

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
    const usertoken = localStorage.userToken;
    const config = {
        headers: { Authorization: 'Bearer ' + accesstoken },
    };
    const VerticalNext = () => {
        props.Next();
    };
    const handleNext = () => {
        childRef.current.saveData();
        if (activeStep == 0 || activeStep == 1 || activeStep == 3) {
            const isVilid = childRef.current.Validate();
            if (isVilid == true) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else {
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
        setloading(true);
        const travelPlan = childRef.current.saveData();

        const isVilid = childRef.current.Validate();
        if (isVilid) {
            let personalInfo = counter.personalInfoReducer[counter.personalInfoReducer.length - 1];
            let addressInfo = counter.address[counter.address.length - 1];
            let familyInfo = counter.familyReducer[counter.familyReducer.length - 1];
            let appointment = counter.appointmentDate[counter.appointmentDate.length - 1];
            let siteInfo = counter.siteInformation[counter.siteInformation.length - 1];
            let serviceInfo = counter.service[counter.service.length - 1];
            let replacementReason = counter.replacment[counter.replacment.length - 1];
            const requestInfo = counter.request[counter.request.length - 1];
            if ((serviceInfo ? Number.parseInt(serviceInfo.appointemntType, 10) : 0) === 2) {
                const requestBody = {
                    requestId: requestInfo ? Number.parseInt(requestInfo.requestId, 10) : 0,
                    requestMode: serviceInfo && serviceInfo.isUrgent === true ? 1 : 0,
                    officeId: siteInfo ? Number.parseInt(siteInfo.offceId, 10) : 0,
                    deliverySiteId: siteInfo
                        ? Number.parseInt(siteInfo.deliverySiteId, 10)
                        : 0,
                    requestTypeId: serviceInfo
                        ? Number.parseInt(serviceInfo.appointemntType, 10)
                        : 0,
                    appointmentIds: appointment ? [appointment[0].id] : [],
                    userName: localStorage.logedInUsedData ? JSON.parse(localStorage.logedInUsedData).username : '',
                    deliveryDate: "",
                    status: 0,
                    confirmationNumber: '',
                    applicants: [
                        {
                            personId: requestInfo ? Number.parseInt(requestInfo.personResponses.id, 10) : 0,
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
                            dateOfBirth: personalInfo ? personalInfo.birthDate?getFormatedDate(personalInfo.birthDate):null : null,
                            gender: personalInfo
                                ? Number.parseInt(personalInfo.gender, 10)
                                : null,
                            nationalityId: personalInfo
                                ? Number.parseInt(personalInfo.nationalityId, 10)
                                : null,
                            height: personalInfo ? personalInfo.height : null,
                            eyeColor: personalInfo ? personalInfo.eyeColor : null,
                            hairColor: personalInfo ? personalInfo.hairColor : null,
                            occupationId: personalInfo
                                ? Number.parseInt(personalInfo.occupationId, 10)
                                : null,
                            birthPlace: personalInfo ? personalInfo.birthPlace : null,
                            halfCast: personalInfo ? personalInfo.halfCast : null,
                            enrolmentDate: personalInfo ? personalInfo.birthDate : null,
                            birthCertificateId: personalInfo
                                ? personalInfo.birthCertificatNo
                                : '',
                            photoPath: '',
                            employeeID: '',
                            applicationNumber: '',
                            organizationID: '',
                            isUnder18: personalInfo ? personalInfo.isUnder18 : false,
                            isAdoption: personalInfo ? personalInfo.isAdoption : false,
                            passportNumber: travelPlan ? travelPlan.passportNumber : null,
                            issueDate: travelPlan ? (travelPlan.isIssueDateChanged || travelPlan.isExpirationDateChanged ?(travelPlan.issueDate?getFormatedDate(travelPlan.issueDate):null) : null) : null,
                            expireDate: travelPlan ? (travelPlan.isExpirationDateChanged || travelPlan.isIssueDateChanged ? (travelPlan.expirationDate?getFormatedDate(travelPlan.expirationDate):null) : null) : null,
                            passportType: travelPlan ? travelPlan.passportType : null,
                            isDatacorrected: travelPlan ? travelPlan.isDatacorrected : false,
                            passportPageId: travelPlan
                                ? Number.parseInt(travelPlan.pageQuantity, 10)
                                : 0,
                            correctionType: travelPlan
                                ? travelPlan.correctionReason && travelPlan.correctionReason != ''
                                    ? Number.parseInt(travelPlan.correctionReason, 10)
                                    : 0
                                : 0,
                            maritalStatus: personalInfo
                                ? Number.parseInt(personalInfo.martialStatus, 10)
                                : 0,
                            birthCertificateId: personalInfo
                                ? personalInfo.birthCertificatNo
                                : null,
                            phoneNumber: personalInfo ? personalInfo.phoneNumber : null,
                            email: personalInfo ? personalInfo.email : null,
                            requestReason: replacementReason
                                ? Number.parseInt(replacementReason.reasonForReplacment)
                                : 0,
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
                console.log(JSON.stringify(requestBody));
                API.post(
                    'https://epassportservicesaddt.azurewebsites.net/Request/api/V1.0/Request/SubmitRequest',
                    requestBody,
                    config
                )
                    .then((todo) => {
                        setloading(false);
                        debugger
                        setResponseMessage(todo.data.message);
                        setResponseAlert(true);
                        setIsSuccess(true);
                        const commonData = {
                            requestPersonId:
                                todo.data.serviceResponseList[0].personResponses.requestPersonId,
                        };
                        setPersonId(todo.data.serviceResponseList[0].personResponses.id)
                        dispatch(addCommonData(commonData));
                        dispatch(newRequest(todo.data.serviceResponseList[0]))
                        API.get("https://epassportservicesaddt.azurewebsites.net/Master/api/V1.0/ServicePrice/GetPriceForRequest?requestId=" + todo.data.serviceResponseList[0].requestId, config)
                            .then((todo) => {
                                dispatch(addPriceInfo(todo.data));
                            })
                            .catch((err) => {
                                console.log("AXIOS ERROR: ", err.response);
                            })
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);

                    })
                    .catch((err) => {
                        debugger
                        setloading(false);
                        console.log('Body: ', JSON.stringify(requestBody));
                        console.log('AXIOS ERROR: ', err.response);
                        if (err.response != null && err.response != "undefined") setResponseMessage(err.response.data.Message);
                        else setResponseMessage('something goes wrong!');
                        setResponseAlert(true);
                    });

            }
            else {
                const requestBody = {
                    requestId: requestInfo ? Number.parseInt(requestInfo.requestId, 10) : 0,
                    requestMode: serviceInfo && serviceInfo.isUrgent === true ? 1 : 0,
                    officeId: siteInfo ? Number.parseInt(siteInfo.offceId, 10) : 0,
                    deliverySiteId: siteInfo
                        ? Number.parseInt(siteInfo.deliverySiteId, 10)
                        : 0,
                    requestTypeId: serviceInfo
                        ? Number.parseInt(serviceInfo.appointemntType, 10)
                        : 0,
                    appointmentIds: [],
                    userName: localStorage.logedInUsedData ? JSON.parse(localStorage.logedInUsedData).username : '',
                    deliveryDate: appointment ? appointment.date : "",
                    deliveryDateFormat: "yyyy-MM-dd",
                    status: 0,
                    confirmationNumber: '',
                    applicants: [
                        {
                            personId: requestInfo ? Number.parseInt(requestInfo.personResponses.id, 10) : 0,
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
                            dateOfBirth: personalInfo ? getFormatedDate(personalInfo.birthDate) : null,
                            birthPlace: personalInfo ? personalInfo.birthPlace : null,
                            gender: personalInfo
                                ? Number.parseInt(personalInfo.gender, 10)
                                : null,
                            nationalityId: personalInfo
                                ? Number.parseInt(personalInfo.nationalityId, 10)
                                : null,
                            height: personalInfo ? personalInfo.height : null,
                            eyeColor: personalInfo ? personalInfo.eyeColor : null,
                            hairColor: personalInfo ? personalInfo.hairColor : null,
                            occupationId: personalInfo
                                ? Number.parseInt(personalInfo.occupationId, 10)
                                : null,
                            halfCast: personalInfo ? personalInfo.halfCast : null,
                            enrolmentDate: personalInfo ? personalInfo.birthDate : null,
                            birthCertificateId: personalInfo
                                ? personalInfo.birthCertificatNo
                                : '',
                            photoPath: '',
                            employeeID: '',
                            applicationNumber: '',
                            organizationID: '',
                            isUnder18: personalInfo ? personalInfo.isUnder18 : false,
                            isAdoption: personalInfo ? personalInfo.isAdoption : false,
                            passportNumber: travelPlan ? travelPlan.passportNumber : null,
                            issueDate: travelPlan ? (travelPlan.isIssueDateChanged || travelPlan.isExpirationDateChanged ?(travelPlan.issueDate?getFormatedDate(travelPlan.issueDate):null) : null) : null,
                            expireDate: travelPlan ? (travelPlan.isExpirationDateChanged || travelPlan.isIssueDateChanged ? (travelPlan.expirationDate?getFormatedDate(travelPlan.expirationDate):null) : null) : null,
                            passportType: travelPlan ? travelPlan.passportType : null,
                            isDatacorrected: travelPlan ? travelPlan.isDatacorrected : false,
                            passportPageId: travelPlan
                                ? Number.parseInt(travelPlan.pageQuantity, 10)
                                : 0,
                            correctionType: travelPlan
                                ? travelPlan.correctionReason && travelPlan.correctionReason != ''
                                    ? Number.parseInt(travelPlan.correctionReason, 10)
                                    : 0
                                : 0,
                            maritalStatus: personalInfo
                                ? Number.parseInt(personalInfo.martialStatus, 10)
                                : 0,
                            birthCertificateId: personalInfo
                                ? personalInfo.birthCertificatNo
                                : null,
                            phoneNumber: personalInfo ? personalInfo.phoneNumber : null,
                            email: personalInfo ? personalInfo.email : null,
                            requestReason: replacementReason
                                ? Number.parseInt(replacementReason.reasonForReplacment)
                                : 0,
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
                console.log(JSON.stringify(requestBody));
                API.post(
                    'https://epassportservicesaddt.azurewebsites.net/Request/api/V1.0/Request/SubmitRequest',
                    requestBody,
                    config
                )
                    .then((todo) => {
                        setResponseMessage(todo.data.message);
                        setResponseAlert(true);
                        setIsSuccess(true);
                        setloading(false);
                        const commonData = {
                            requestPersonId:
                                todo.data.serviceResponseList[0].personResponses.requestPersonId,
                        };
                        setPersonId(todo.data.serviceResponseList[0].personResponses.id)
                        dispatch(addCommonData(commonData));
                        setActiveStep(4);
                        dispatch(newRequest(todo.data.serviceResponseList[0]))
                        API.get("https://epassportservicesaddt.azurewebsites.net/Master/api/V1.0/ServicePrice/GetPriceForRequest?requestId=" + todo.data.serviceResponseList[0].requestId, config)
                            .then((todo) => {
                                dispatch(addPriceInfo(todo.data));
                            })
                            .catch((err) => {
                                console.log("AXIOS ERROR: ", err.response);
                            })

                    })
                    .catch((err) => {
                        console.log('Body: ', JSON.stringify(requestBody));
                        console.log('AXIOS ERROR: ', err.response);
                        if (err.response != null && err.response != "undefined") setResponseMessage(err.response.data.message);
                        else setResponseMessage('something goes wrong!');
                        setResponseAlert(true);
                        setloading(false);
                    });
            }
        }
        else {
            setloading(false);
        }
    };
    const handelUploading = () => {
        setIsUploading(true);
    };
    const finifhUploading = () => {
        setIsUploading(false);
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
                return (

                    <TravelPlan
                        ref={childRef}
                        resMessage={responseMessage}
                        isSucces={isSuccess}
                        respnseGet={responseAlert}
                    />

                );
            case 4:
                return (
                    <Attachment
                        ref={childRef}
                        hideBack={handelUploading}
                        showBack={finifhUploading}
                        VerticalNext={VerticalNext}
                    />
                );
            default:
                return 'Unknown stepIndex';
        }
    }
    useImperativeHandle(ref, () => ({
        saveData() {
            //setDataSaved(true)
        },
        isCompleted() {
            return formCompleted;
        },
    }));
    return (
        <div>
            {loading ? <Spinner /> :
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
                        ) : isUploading === false ? (
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
                                    {activeStep === steps.length - 1 ? null : (
                                        <Grid item xs={1}>
                                            {activeStep === steps.length - 2 ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleSubmit}
                                                >
                                                    Submit
                                                </Button>
                                            ) : activeStep === steps.length - 1 ? null : (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                >
                                                    Next
                                                </Button>
                                            )}
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                        ) : null}
                    </div>
                </div>
            }
        </div>);
});
export default PersonalInfoStepper;
