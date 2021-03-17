import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
} from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCard,
    MDBCardBody,
    MDBAlert,
    MDBTypography
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../redux/actions/addTravelPlanAction';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axiosInstance from '../Utils/axios';
import { useTranslation, Trans } from 'react-i18next';
function requestTypeGetter(requetTypeId) {
    switch (requetTypeId) {
        case 2:
            return 'New';
        case 3:
            return 'Renew/Replacement';
        case 4:
            return 'Lost';
        case 8:
            return 'Correction';
        default:
            return 'Unkown';
    }
}
const TravelPlan = forwardRef((props, ref) => {
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [travelPlan, setTravelPlan] = useState({
        pageQuantity: 1,
        passportNumber: '',
        expirationDate: new Date(),
        issueDate: new Date(),
        correctionReason: '',
        isDatacorrected: false,
        isIssueDateChanged: false,
        isExpirationDateChanged: false,
        dataSaved: false,
        formCompleted: false,
    });
    const [notCompleted, setNotCompleted] = useState({
        pageQuantity: false,
        passportNumber: true,
        expirationDate: true,
        issueDate: true,
        correctionReason: true,
        isDatacorrected: true,
    });
    const [passportTypeList, setPassportTypeList] = useState([]);
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    const isRequired = 'is required!';

    let requestTypefromRedux = useSelector((state) => state.service);
    let personalInfoReducer = useSelector((state) => state.personalInfoReducer);

    if (counter.travelPlan.length === 0) {
        dispatch(addTravelPlan(travelPlan));
    }
    const [isOldPassportValid, setIsOldPassportValid] = useState(true);
    const [isIssueDateValid, setIsIssueDateValid] = useState(false);
    const [isExpireDateValid, setIsExpireDateValid] = useState(false);
    const [isOnLoad, setIsOnLoad] = useState(true);
    const handleChange = (event) => {
        
        const { name, value } = event.target;
        setTravelPlan((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (value !== '') {
            setNotCompleted((prevState) => ({
                ...prevState,
                [name]: false,
            }));
            dispatch(addTravelPlan({ ...travelPlan, [name]: value }));
        }

        else {
            setNotCompleted((prevState) => ({
                ...prevState,
                [name]: true,
            }));
        }


        if (name === 'passportNumber') {
            let checkPassport = new RegExp(/^[a-zA-Z]{2}\d{7}$/).test(value);
            if(checkPassport){
                setIsOldPassportValid(true);
            } 
            else {
                setIsOldPassportValid(false);
            }
           

        }
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

    if(isLoading && !isIssueDateValid){
        if(getFormatedDate(travelPlan.issueDate) !==getFormatedDate(new Date())){
            setIsIssueDateValid(true);
            setIsExpireDateValid(true);
        }
    }
    const handleCheck = (name, checked) => {
        setTravelPlan((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
        dispatch(addTravelPlan(travelPlan))
    };

    const [notifyUser, setNotifyUser] = useState('');
    const handleissueDateChange = (date) => {
        compareDates(date, true);
        setSelectedissueDate(date);
        setTravelPlan((prevState) => ({
            ...prevState,
            issueDate: date,
            isIssueDateChanged: true,
        }));

        setIsIssueDateValid(true);
    };
    const handleexpirationDateChange = (date) => {
        compareDates(date, false);
        setSelectedexpirationDate(date);


        setTravelPlan((prevState) => ({
            ...prevState,
            expirationDate: date,
            isExpirationDateChanged: true,
        }));
        setIsExpireDateValid(true);
    };
    // check date difference between two dates
    const compareDates = (changedDate, isIssue) => {
        // To calculate the time difference of two dates 
        if(changedDate){
        let Difference_In_Time = '';
        if (isIssue) {
            Difference_In_Time = (changedDate.getTime() + 157784760000) - selectedexpirationDate.getTime();
        } else {
            Difference_In_Time = (selectedissueDate.getTime() + 157784760000) - changedDate.getTime();
        }

        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Days > 182.5) {
            setNotifyUser('Your Passport is not expired you may required to pay an extra payment!');
        } else { setNotifyUser(''); }
    }
    }
    var prevInfo = counter.travelPlan[counter.travelPlan.length - 1];
    if (prevInfo !== null && typeof prevInfo !== 'undefined') {
        if (travelPlan.formCompleted === false) {
            setTravelPlan((prevState) => ({
                ...prevState,
                //pageQuantity: prevInfo ? prevInfo.pageQuantity : 1,
                pageQuantity:1,
                passportNumber: prevInfo ? prevInfo.passportNumber : null,
                expirationDate: prevInfo ? prevInfo.expirationDate : new Date(),
                issueDate: prevInfo ? prevInfo.issueDate : new Date(),
                correctionReason: prevInfo ? prevInfo.correctionReason : null,
                isDatacorrected: prevInfo ? prevInfo.isDatacorrected : false,
                dataSaved: prevInfo ? prevInfo.dataSaved : null,
                formCompleted: true,
            }));
        }
    }
    const serviceSelcetion = counter.service[counter.service.length - 1];
    const requestType = serviceSelcetion.appointemntType;
    const requestTypeStr = requestTypeGetter(requestType);

    const [selectedissueDate, setSelectedissueDate] = React.useState(
        prevInfo ? prevInfo.issueDate : new Date()
    );
    const [selectedexpirationDate, setSelectedexpirationDate] = React.useState(
        prevInfo ? prevInfo.expirationDate : new Date()
    );
    useEffect(() => {
        setNotCompleted({
            //pageQuantity: travelPlan.pageQuantity === '' ? true : false,
            pageQuantity:false,
            passportNumber: travelPlan.passportNumber === '' ? true : false,
            expirationDate: travelPlan.expirationDate === '' ? true : false,
            issueDate: travelPlan.issueDate === '' ? true : false,
            correctionReason: travelPlan.correctionReason === '' ? true : false,
        });
        setPassportTypeList(JSON.parse(localStorage.PassportPageQuantity))
        if (passportTypeList.length === 0) {
            axiosInstance.get('/Master/api/V1.0/PassportPage/GetAll')
                .then((todo) => {
                    setPassportTypeList(todo.data.pagePassports);
                })
                .catch((err) => {
                    console.log('AXIOS ERROR: ', err.response);
                });
        }
    }, []);
    useImperativeHandle(ref, () => ({
        saveData() {
            setTravelPlan((prevState) => ({
                ...prevState,
                dataSaved: true,
            }));
            dispatch(addTravelPlan(travelPlan));
            return travelPlan;
        },
        Validate() {
            debugger;
            setIsOnLoad(false);
            // setNotCompleted({
            //   pageQuantity: Number.parseInt(travelPlan.pageQuantity, 10) === 0 ? true : false,
            //   passportNumber: travelPlan.passportNumber === '' ? true : false,
            //   expirationDate: travelPlan.expirationDate === '' ? true : false,
            //   issueDate: travelPlan.issueDate === '' ? true : false,
            //   correctionReason: travelPlan.correctionReason === '' ? true : false,
            // });
            if (notCompleted.pageQuantity === true) {
                return false;
            }
            else if (requestTypeStr != 'New' && notCompleted.passportNumber === true) {
                return false;
            }
            else if (requestTypeStr != 'New' && (isOldPassportValid === false ||isIssueDateValid===false||isExpireDateValid===false)) {
                return false;
            }
            else
                return true;
        },
    }));
    return (
        <MDBCard>
            <MDBCardBody>
                {props.respnseGet === true ? (
                    props.isSucces === true ? (
                        null
                    ) : (
                            <MDBAlert color="danger">{props.resMessage}</MDBAlert>
                        )
                ) : null}
                <form>
                    <div>
                        <MDBRow>
                            <MDBCol md="4" className="required-field">
                                <div>
                                    <label>
                                        {t('requestForm.passportPageNo')}<i style={{ color: 'red' }}>*</i>{' '}
                                    </label>
                                    <select
                                        className="browser-default custom-select"
                                        name="pageQuantity"
                                        onChange={handleChange}
                                    >
                                        <option>  {t('requestForm.selectPassportPage')}</option>
                                        {passportTypeList.map((passportType) => (
                                            <option value={passportType.id} selected={passportType.id==1}>
                                                {passportType.passportPage}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <span style={{ color: 'red' }}>
                                    {' '}
                                    {notCompleted.pageQuantity === true &&
                                        travelPlan.dataSaved === true
                                        ? 'Passport page ' + isRequired
                                        : null}
                                </span>{' '}
                            </MDBCol>
                            {requestTypeStr != 'New' ? (
                                <MDBCol md="4">
                                    <MDBInput
                                        valueDefault={prevInfo ? prevInfo.passportNumber : null}
                                        name="passportNumber"
                                        className="form-control"
                                        onBlur={handleChange}
                                        type="text"
                                        label="Old Passport Number"
                                    />
                                    <span style={{ color: 'red' }}>
                                        {' '}
                                        {notCompleted.passportNumber === true &&
                                            travelPlan.dataSaved === true
                                            ? 'Old Passport Number ' + isRequired
                                            : null}

                                    </span>{' '}

                                    <span style={{ color: 'red' }}>
                                        {' '}
                                        {
                                            !isOldPassportValid 
                                                ? 'Please Enter Valid Passport Number'
                                                : null
                                        }
                                    </span>

                                </MDBCol>
                            ) : (null)}

                        </MDBRow>
                        <hr />
                        {requestTypeStr != 'New' ? (
                            <MDBRow>
                                <MDBCol md="4" className="date-picker">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Old Passport Issue Date"
                                            format="MM/dd/yyyy"
                                            value={selectedissueDate}
                                            onChange={handleissueDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <span style={{ color: 'red' }}>
                                        {' '}
                                        {
                                            !isIssueDateValid && !isOnLoad
                                                ? 'Please Enter Old Passport Issue Date'
                                                : null
                                        }
                                    </span>
                                </MDBCol>
                                <MDBCol md="4" className="date-picker">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Old Passport Expiration Date"
                                            format="MM/dd/yyyy"
                                            value={selectedexpirationDate}
                                            onChange={handleexpirationDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <span style={{ color: 'red' }}>
                                        {' '}
                                        {
                                            !isExpireDateValid && !isOnLoad
                                                ? 'Please Enter Old Passport Expiration Date'
                                                : null
                                        }
                                    </span>
                                </MDBCol>
                            </MDBRow>
                        ) : null}
                        <MDBRow>
                            {requestTypeStr === 'Correction' ||
                                travelPlan.isDatacorrected === true ? (
                                    <MDBCol md="3">
                                        <label>Correction type</label>
                                        <select
                                            className="browser-default custom-select"
                                            name="correctionReason"
                                            onChange={handleChange}
                                        >
                                            <option value="">select correction type</option>
                                            <option value="1">NameCorrection</option>
                                            <option value="2">Birth Date Correction</option>
                                            <option value="3">
                                                Both Name and Birth Date Correction
                    </option>
                                        </select>
                                        <span style={{ color: 'red' }}>
                                            {' '}
                                            {notCompleted.correctionReason == true &&
                                                travelPlan.dataSaved == true
                                                ? 'correction reason ' + isRequired
                                                : null}
                                        </span>
                                    </MDBCol>
                                ) : null}

                            {requestTypeStr === 'Renew/Replacement' ||
                                requestTypeStr === 'Lost' ? (
                                    <MDBCol md="3">
                                        <label></label>
                                        <div class="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="isCorrection"
                                                onChange={(e) =>
                                                    handleCheck('isDatacorrected', e.target.checked)
                                                }
                                            />
                                            <label class="custom-control-label" for="isCorrection">
                                                Is Data correction
                    </label>
                                        </div>
                                    </MDBCol>
                                ) : null}
                        </MDBRow>
                        {
                            notifyUser ? <MDBTypography
                                note
                                noteColor='danger'
                                noteTitle={`Notification: `}
                            >

                                {notifyUser}

                            </MDBTypography> : null
                        }
                    </div>
                </form>
            </MDBCardBody>
        </MDBCard>
    );
});

export default TravelPlan;
