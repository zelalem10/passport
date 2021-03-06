import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBAlert,
} from 'mdbreact';
import AvailableTimeSlot from './appointmetTimeSlots';
import './disabledates.css';
import { useDispatch, useSelector } from 'react-redux';
import addAppointmentDate from '../../../redux/actions/addAppointmetntDate';
import * as serviceActions from '../../../redux/actions/serviceActions';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation, Trans } from 'react-i18next';
import Spinner from '../../common/Spinner';
import axiosInstance from '../../Utils/axios';

const MyApp = forwardRef((props, ref) => {
  
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({ date: new Date(), time: '' });
  const [respone, setResponse] = useState({});
  const [disabledDate, setDisabledDate] = useState([]);
  const [availableDatess, setAvailableDates] = useState([]);
  const [key, setKey] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setloading] = useState(true);

  const [timeSlots, setTimeSlots] = useState([]);
  const [showAvailableTimeSlots, setShowAvailableTimeSlots] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [formCompleted, setFormCompleted] = useState(false);
  const [activeTimeSlot, setActiveTImeSlot] = useState({
    key: '',
    active: false,
  });
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const [officeInformation, setOfficeInformation] = useState({});
  const [isUrgentAppointment, setIsUrgentAppointment] = useState(false);
  const [data, setData] = useState({});
  const [availableDateAndQota, setavailableDateAndQota] = useState([]);

  const counter = useSelector((state) => state);
  const siteInfo = counter.siteInformation[counter.siteInformation.length - 1];
  if (officeInformation && siteInfo) {
    if (
      !officeInformation.hasOwnProperty('offceId') &&
      siteInfo.hasOwnProperty('offceId')
    ) {
      setOfficeInformation(siteInfo);
    }
  }
  const [durationLength,setDurationLength]=useState(0);
  const [estimatedDate, setEstimatedDate] = useState('');
  if(siteInfo && durationLength===0){
    setDurationLength(siteInfo.durationDays)
  }
  if (
    counter.service.length !== 0 &&
    Object.keys(data).length === 0 &&
    data.constructor === Object
  ) {
    setData(counter.service[counter.service.length - 1]);
  }
  function getFormatedDate(date){
    debugger;
    if(date && typeof(date)!=='undefined'){
    let dateToFormat= new Date(date);
    let utc_offset=dateToFormat.getTimezoneOffset();
    // new Date(dateToFormat.getTime()-utc_offset);
    dateToFormat.setMinutes(dateToFormat.getMinutes()-utc_offset);
  let formatedYear = dateToFormat.getFullYear();
  let formatedMonth = (1 + dateToFormat.getMonth()).toString();
  formatedMonth =
    formatedMonth.length > 1 ? formatedMonth : '0' + formatedMonth;
  let formatedDay = dateToFormat.getDate().toString();
  formatedDay = formatedDay.length > 1 ? formatedDay : '0' + formatedDay;
  let stringDateValue = `${formatedYear}-${formatedMonth}-${formatedDay}`;
  console.log(stringDateValue);
  return stringDateValue;
    }
    return null;
}
const newDateWithFormattedTimeZone=(date)=>{
  if(date && typeof(date)!=='undefined'){
        let dateToFormat= new Date(date);
        let utc_offset=dateToFormat.getTimezoneOffset();
        // new Date(dateToFormat.getTime()-utc_offset);
        dateToFormat.setMinutes(dateToFormat.getMinutes()+utc_offset);
        dateToFormat.setHours(0,0,0,0);
        return dateToFormat;
  }
  else{
    return null;
  }

}

  const handleIsUrgent = () => {
    setShowAvailableTimeSlots(false);
    setTimeSlots([]);
    setState({ ...state, date: '' });
    setErrorMessage('');

    setIsUrgentAppointment(!isUrgentAppointment);
    dispatch(
      serviceActions.selectService({
        ...data,
        step: data.step,
        isGroup: data.isGroup,
        appointemntType: data.appointemntType,
        numberOfApplicants: data.numberOfApplicants,
        isUrgent: !isUrgentAppointment,
      })
    );
  };

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#3f51b5',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#3f51b5',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  const toggleClass = (e) => {
    const currentState =
      e.target.className === 'btn_select active' ? true : false;
    setActiveTImeSlot({ key: e.target.id, active: !currentState });
  };


  useImperativeHandle(ref, () => ({
   

    
    saveData() {
      debugger;
     
      if(state.date){
      let urgentQuotaId = 0;
      let stringDateValue=getFormatedDate(state.date);
      if (isUrgentAppointment) {
        if (availableDateAndQota) {
          for (let i = 0; i < availableDateAndQota.length; i++) {
            let dateTobeformated = newDateWithFormattedTimeZone(availableDateAndQota[i].date);
              let stringAvailableDateValue=getFormatedDate(dateTobeformated);
            if (stringDateValue == stringAvailableDateValue) {
              urgentQuotaId = availableDateAndQota[i].urgentQuotaId;
            }
          }
        }
        if (state.date){
          axiosInstance.post('/Schedule/api/V1.0/Schedule/SubmitUrgentAppointment',{
            id: 0,
            date: stringDateValue,
            dateTimeFormat: 'yyyy-MM-dd',
            urgentQuotaId: urgentQuotaId,
            noOfApplicants: 1,
          })
          .then((response) => {
            dispatch(
              addAppointmentDate(response.data.urgentAppointmentResponses)
            );
            if (response.data.urgentAppointmentResponses) {
              setFormCompleted(true);
              props.Next();
            } else {
              setErrorMessage(response.data.message);
            }
          })
          .catch((error) => {
            if (state.date) {
              setErrorMessage(error.message);
            } else {
              setErrorMessage('Please Select Date ');
            }
          });} else {
            setErrorMessage('Please Select Date');
          }
      } else {
        if(state.date && selectTime){
          let sampleData={
              id: 0,
            date: stringDateValue,
            durationId: parseInt(selectTime),
            dateTimeFormat: 'yyyy-MM-dd',
            noOfApplicants: parseInt(data.numberOfApplicants),
            officeId:parseInt(siteInfo.offceId),
            requestTypeId:data.appointemntType,
          };
          console.log(JSON.stringify(sampleData));
          setloading(true);
          axiosInstance.post('/Schedule/api/V1.0/Schedule/SubmitAppointment',{
            id: 0,
            date: stringDateValue,
            durationId: parseInt(selectTime),
            dateTimeFormat: 'yyyy-MM-dd',
            noOfApplicants: parseInt(data.numberOfApplicants),
            officeId:parseInt(siteInfo.offceId),
            requestTypeId:data.appointemntType,
          })
          .then((response) => {
            console.log(response.data.appointmentResponses);
            dispatch(addAppointmentDate(response.data.appointmentResponses));
            if (response.data.appointmentResponses) {
              setFormCompleted(true);
              props.Next();
            } else {
              setErrorMessage(response.data.message);
            }
            setloading(false);
          })
          .catch((error) => {
            debugger;
            setloading(false);
            if (state.date && selectTime) {
              setErrorMessage(error.message);
            } else if (state.date && !selectTime) {
              setErrorMessage('Please Select Time Interval');
            } else {
              setErrorMessage('Please Select Date and Time Interval');
            }
          });
        }else if (state.date && !selectTime) {
          setErrorMessage('Please Select Time Interval');
        } else {
          setErrorMessage('Please Select Date and Time Interval');
        }
      }
    }else{
setErrorMessage('Please Select Date.')
      }
    },
    isCompleted() {
      
     
      return formCompleted;
    },
  }));

  
  const baseUrl = 'https://epassportservicesaddt.azurewebsites.net/';
  const availableDates = [];
  let advancedRestrictionData = {};
  let disabledDates = [];
  let availabletIMES = [];

  const handleTimeSelect = (e) => {
    
    setState({ ...state, time: e.target.value });
    setSelectTime(e.target.id);
    toggleClass(e);
    if(e.target.value){
      setErrorMessage('');
    }


  };
  let selectDays = '';
  let ye = '';
let mo = '';
let da = '';

  useEffect(() => {
    if (officeInformation.hasOwnProperty('offceId') && data.appointemntType===2) {
      axiosInstance.get('/Master/api/V1.0/AdvancedRestriction/GetAll')
        .then(async (response) => {
          advancedRestrictionData = siteInfo
            ? response.data.advancedRestrictions.filter(
                (advanceRestriction) =>
                  advanceRestriction.officeId == parseInt(siteInfo.offceId)
              )[0]
            : response.data.advancedRestrictions[0];
          advancedRestrictionData = advancedRestrictionData
            ? advancedRestrictionData
            : response.data.advancedRestrictions[0];
          setResponse(advancedRestrictionData);

          if (isUrgentAppointment) {
            axiosInstance.post('/Schedule/api/V1.0/Schedule/GetUrgentAvailableDateAndTimes',
            {
              startDate: newDateWithFormattedTimeZone(
                new Date().setTime(
                  new Date().getTime() +
                    advancedRestrictionData.minDays * 86400000
                )
              ),
              endDate: newDateWithFormattedTimeZone(
                new Date().setTime(
                  new Date().getTime() +
                    advancedRestrictionData.maxDays * 86400000
                )
              ),
              requestTypeId: data.appointemntType,
              officeId: parseInt(siteInfo.offceId),
              noOfApplicants: 1,
            })
              .then((responses) => {
                setavailableDateAndQota(responses.data.availableDateAndTimes);
                for (
                  let i = 0;
                  i < responses.data.availableDateAndTimes.length;
                  i++
                ) {
                  availabletIMES.push(responses.data.availableDateAndTimes[i]);
                  let dateAV = newDateWithFormattedTimeZone(
                    responses.data.availableDateAndTimes[i].date
                  );
                  let formatedavDate =
                    dateAV.getFullYear() +
                    ',' +
                    (dateAV.getMonth() + 1) +
                    ',' +
                    dateAV.getDate();
                  availableDates.push(newDateWithFormattedTimeZone(formatedavDate).toString());
                }
                setAvailableTimes(availabletIMES);

                let startDate = newDateWithFormattedTimeZone(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.minDays * 86400000
                  )
                );
                let formatedDate =getFormatedDate(startDate);

                setAvailableDates(availableDates);

                let currentDate = newDateWithFormattedTimeZone(formatedDate);
                let stopDate = newDateWithFormattedTimeZone(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.maxDays * 86400000
                  )
                );
                while (currentDate <= stopDate) {
                  let formatedCurrentDateString = currentDate.toString();
                  if(availableDates.length===0){
                    disabledDates.push(newDateWithFormattedTimeZone(currentDate));
                  }
                  for (let i = 0; i < availableDates.length; i++) {
                   
                    if (
                      availableDates.indexOf(
                        newDateWithFormattedTimeZone(formatedCurrentDateString).toString()
                      ) === -1
                    ) {
                      disabledDates.push(newDateWithFormattedTimeZone(currentDate));
                    }
                  }
                  
                  setDisabledDate(disabledDates);
                  currentDate = newDateWithFormattedTimeZone(
                    new Date().setTime(currentDate.getTime() + 1 * 86400000)
                  );
                }
                if (responses.data.availableDateAndTimes.length > 0) {
                  setKey(Math.random());
                }
              })
              .catch((error) => {
                console.log('error' + error);
              });
          } else {
            
            axiosInstance.post('/Schedule/api/V1.0/Schedule/GetAvailableDateAndTimes',{
              
              startDate: newDateWithFormattedTimeZone(
                new Date().setTime(
                  new Date().getTime() +
                    advancedRestrictionData.minDays * 86400000
                )
              ),
              endDate: newDateWithFormattedTimeZone(
                new Date().setTime(
                  new Date().getTime() +
                    advancedRestrictionData.maxDays * 86400000
                )
              ),
              requestTypeId: data.appointemntType,
              officeId: parseInt(siteInfo.offceId),
              noOfApplicants: parseInt(data.numberOfApplicants),
            })
              .then((responses) => {
                debugger;
                for (
                  let i = 0;
                  i < responses.data.availableDateAndTimes.length;
                  i++
                ) {
                  availabletIMES.push(responses.data.availableDateAndTimes[i]);
                  let formatedavDate=responses.data.availableDateAndTimes[i].date;
                  availableDates.push(newDateWithFormattedTimeZone(formatedavDate).toString());
                }
                setAvailableTimes(availabletIMES);

                let startDate = newDateWithFormattedTimeZone(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.minDays * 86400000
                  )
                );
                debugger;

                setAvailableDates(availableDates);

                let currentDate = startDate;
                let stopDate = newDateWithFormattedTimeZone(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.maxDays * 86400000
                  )
                );
                while (currentDate <= stopDate) {
                  for (let i = 0; i < availableDates.length; i++) {
                    let formatedCurrentDateString = currentDate.toString();
                    if (
                      availableDates.indexOf(
                        newDateWithFormattedTimeZone(formatedCurrentDateString).toString()
                      ) === -1
                    ) {
                      disabledDates.push(newDateWithFormattedTimeZone(currentDate));
                      break;
                    }
                    break;
                  }
                  setDisabledDate(disabledDates);
                  currentDate =new Date(
                    new Date().setTime(currentDate.getTime() + 1 * 86400000)
                  );
                }
                if (responses.data.availableDateAndTimes.length > 0) {
                  setKey(Math.random());
                }
                setloading(false);
              })
              .catch((error) => {
                setloading(false);
                console.log('error' + error);
              });
          }
        })
        .catch((error) => {
          
          console.log('error' + error);
        });
    }else if(data.appointemntType===3 || data.appointemntType===4 ||data.appointemntType===8){
      
      if(siteInfo){

      axiosInstance.post('/Schedule/api/V1.0/Schedule/GetAvailableDeliveryAppointment',{
        "requestTypeId": data.appointemntType,
        "officeId": parseInt(siteInfo.offceId),
        "noOfApplicants": 1
      
    }).then((response)=>{
        setloading(false);
         selectDays = siteInfo?newDateWithFormattedTimeZone(response.data.date):new Date();
   ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(selectDays);
 mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(selectDays);
 da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(selectDays);
 setEstimatedDate(`${mo} ${da}, ${ye}`)
 setState({ ...state, date: response.data.date });
 setSelectTime(response.data.duration.id);
//  dispatch(
//   addAppointmentDate({date:response.data.date,id:response.data.duration.id})
// )

      }).catch((error)=>{
setloading(false);
      })
    }
    }
  }, [isUrgentAppointment, officeInformation]);
  const onChange = (date) => {
    setState({ ...state, date: date });
    setSelectTime('');
    showTimeSlots(date);
    setErrorMessage('');
  };
  const showTimeSlots = (date) => {
    if (!isUrgentAppointment) {
      let timeSlotsForSpecificDate = [];
      
      for (let i = 0; i < availableTimes.length; i++) {
        let dateAV = newDateWithFormattedTimeZone(availableTimes[i].date);
        if (dateAV.getTime() === date.getTime()) {
          if (availableTimes[i]) {
            if (availableTimes[i].hasOwnProperty('durations')) {
              for (let l = 0; l < availableTimes[i].durations.length; l++) {
                timeSlotsForSpecificDate.push({
                  time:
                    availableTimes[i].durations[l].startTime +
                    ' - ' +
                    availableTimes[i].durations[l].endTime,
                  id: availableTimes[i].durations[l].id,
                  isMorning: availableTimes[i].durations[l].isMorning,
                });
              }
            }
          }
        }
      }

      setTimeSlots(timeSlotsForSpecificDate);
      setShowAvailableTimeSlots(true);
    }
  };
  const dateValue = state.date.toString();
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
      <MDBContainer className=" pt-3" fluid>
        <h3 className="heading-secondary">{data.appointemntType===2?'Appointment Date And Time':'Delivery Date'} </h3>
        {/* {data.isGroup ? null : (
          <div>
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={isUrgentAppointment}
                  onChange={() => handleIsUrgent()}
                  name="checkedB"
                />
              }
        
              label= "Does the request urgent?"
            />

            {isUrgentAppointment ? (
              <MDBTypography note noteColor="danger" noteTitle="Notice: ">
                <Trans>requestForm.urgentNote</Trans>
              </MDBTypography>
            ) : (
              <MDBTypography
                note
                noteColor="info"
                noteTitle={`Notification: ${durationLength} `}
              >
                <Trans>requestForm.estimatedDelivery</Trans> {durationLength} <Trans>requestForm.days</Trans> {' '}
                {timeSlots.length > 0 ? (
                  <b>{`${selectDays.getFullYear()} 
                  -
                  ${selectDays.getMonth() + 1}
                  -
                  ${selectDays.getDate()}`}</b>
                ) : null}
              </MDBTypography>
            )}
          </div>
        )} */}
        {data.appointemntType!==2?
        <MDBTypography
                note
                noteColor="info"
                noteTitle={`Notification: `}
              >
                
                Estimated Delivery date is {' '}
                 
                  <b>{estimatedDate}</b>
              </MDBTypography>
:null}
              {data.appointemntType===2?(<>
        <MDBRow key={key}>
          <MDBCol md="6">
            <h3><Trans>requestForm.date</Trans></h3>
            <div id="chooseAppointments">
              <Calendar
                allowPartialRange
                onChange={onChange}
                value={state.date}
                minDate={
                  new Date(
                    new Date().setTime(
                      new Date().getTime() + respone.minDays * 86400000
                    )
                  )
                }
                maxDate={
                  new Date(
                    new Date().setTime(
                      new Date().getTime() + (respone.maxDays-1) * 86400000
                    )
                  )
                }
                tileDisabled={({ date, view }) =>
                  view === 'month' && // Block day tiles only
                  disabledDate.some(
                    (disabledDateItem) =>
                      date.getFullYear() === disabledDateItem.getFullYear() &&
                      date.getMonth() === disabledDateItem.getMonth() &&
                      date.getDate() === disabledDateItem.getDate()
                  )
                }
              />
            </div>
          </MDBCol>
          {!isUrgentAppointment ? (
            <MDBCol md="6">
              <h3><Trans>requestForm.time</Trans></h3>
              <AvailableTimeSlot
                selectedDate={dateValue}
                timeLists={timeSlots}
                showAndHide={showAvailableTimeSlots}
                handleTimeSelect={handleTimeSelect}
                activeTimeSlot={activeTimeSlot}
                toggleClass={toggleClass}
                isUrgentAppointment={isUrgentAppointment}
              />
            </MDBCol>
          ) : null}
        </MDBRow>
        {errorMessage ? (
          <MDBRow className="pt-3">
            <MDBCol>
              <MDBAlert color="danger">{errorMessage}</MDBAlert>
            </MDBCol>
          </MDBRow>
        ) : null}</>):null}
        
      </MDBContainer>
      )}
    </div>
  );
});
export default MyApp;
