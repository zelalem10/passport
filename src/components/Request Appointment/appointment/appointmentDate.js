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
import axios from 'axios';
import AvailableTimeSlot from './appointmetTimeSlots';
import './disabledates.css';
import { useDispatch, useSelector } from 'react-redux';
import addAppointmentDate from '../../../redux/actions/addAppointmetntDate';
import * as serviceActions from '../../../redux/actions/serviceActions';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { faBrush } from '@fortawesome/free-solid-svg-icons';
import { useTranslation, Trans } from 'react-i18next';

const MyApp = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({ date: new Date(), time: '' });
  const [respone, setResponse] = useState({});
  const [disabledDate, setDisabledDate] = useState([]);
  const [availableDatess, setAvailableDates] = useState([]);
  const [key, setKey] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);
  const [showAvailableTimeSlots, setShowAvailableTimeSlots] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [formCompleted, setFormCompleted] = useState(false);
  const [activeTimeSlot, setActiveTImeSlot] = useState({
    key: '',
    active: false,
  });
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
  const durationLength = siteInfo ? siteInfo.durationDays : null;
  if (
    counter.service.length !== 0 &&
    Object.keys(data).length === 0 &&
    data.constructor === Object
  ) {
    setData(counter.service[counter.service.length - 1]);
  }
  let selectDays = new Date(state.date);
  let estimatedDays = selectDays.setDate(selectDays.getDate() + durationLength);

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
  const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
      return UserToken;
    } else {
      const SystemToken = localStorage.systemToken;
      return SystemToken;
    }
  };
  const token = tokenValue();
  useImperativeHandle(ref, () => ({
    saveData() {
      if(state.date){
      let urgentQuotaId = 0;
      let formatedYear = state.date.getFullYear();
      let formatedMonth = (1 + state.date.getMonth()).toString();
      formatedMonth =
        formatedMonth.length > 1 ? formatedMonth : '0' + formatedMonth;
      let formatedDay = state.date.getDate().toString();
      formatedDay = formatedDay.length > 1 ? formatedDay : '0' + formatedDay;
      let stringDateValue = `${formatedYear}-${formatedMonth}-${formatedDay}`;
      if (isUrgentAppointment) {
        if (availableDateAndQota) {
          for (let i = 0; i < availableDateAndQota.length; i++) {
            let dateTobeformated = new Date(availableDateAndQota[i].date);
            let formatedAvYear = dateTobeformated.getFullYear();
            let formatedAvMonth = (1 + dateTobeformated.getMonth()).toString();
            formatedAvMonth =
              formatedAvMonth.length > 1
                ? formatedAvMonth
                : '0' + formatedAvMonth;
            let formatedAvDay = dateTobeformated.getDate().toString();
            formatedAvDay =
              formatedAvDay.length > 1 ? formatedAvDay : '0' + formatedAvDay;
            let stringAvailableDateValue = `${formatedAvYear}-${formatedAvMonth}-${formatedAvDay}`;
            if (stringDateValue == stringAvailableDateValue) {
              urgentQuotaId = availableDateAndQota[i].urgentQuotaId;
            }
          }
        }
        if (state.date){
        axios({
          headers: {
            Authorization: 'Bearer ' + token,
          },
          method: 'post',
          url: baseUrl + '/Schedule/api/V1.0/Schedule/SubmitUrgentAppointment',
          data: {
            id: 0,
            date: stringDateValue,
            dateTimeFormat: 'yyyy-MM-dd',
            urgentQuotaId: urgentQuotaId,
            noOfApplicants: 1,
          },
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
        axios({
          headers: {
            Authorization: 'Bearer ' + token,
          },
          method: 'post',
          url: baseUrl + '/Schedule/api/V1.0/Schedule/SubmitAppointment',
          data: {
            id: 0,
            date: stringDateValue,
            durationId: parseInt(selectTime),
            dateTimeFormat: 'yyyy-MM-dd',
            noOfApplicants: parseInt(data.numberOfApplicants),
          },
        })
          .then((response) => {
            dispatch(addAppointmentDate(response.data.appointmentResponses));
            if (response.data.appointmentResponses) {
              setFormCompleted(true);
              props.Next();
            } else {
              setErrorMessage(response.data.message);
            }
          })
          .catch((error) => {
            debugger;
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

  const dispatch = useDispatch();
  const baseUrl = 'https://epassportservices.azurewebsites.net/';
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
  useEffect(() => {
    if (officeInformation.hasOwnProperty('offceId')) {
      axios({
        headers: {
          Authorization: 'Bearer ' + token,
        },
        method: 'get',
        url: baseUrl + '/Master/api/V1.0/AdvancedRestriction/GetAll',
      })
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
          const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          };
          if (isUrgentAppointment) {
            axios({
              headers: headers,
              method: 'post',
              url:
                baseUrl +
                '/Schedule/api/V1.0/Schedule/GetUrgentAvailableDateAndTimes',
              data: {
                startDate: new Date(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.minDays * 86400000
                  )
                ),
                endDate: new Date(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.maxDays * 86400000
                  )
                ),
                requestTypeId: data.appointemntType,
                officeId: parseInt(siteInfo.offceId),
                noOfApplicants: 1,
              },
            })
              .then((responses) => {
                setavailableDateAndQota(responses.data.availableDateAndTimes);
                for (
                  let i = 0;
                  i < responses.data.availableDateAndTimes.length;
                  i++
                ) {
                  availabletIMES.push(responses.data.availableDateAndTimes[i]);
                  let dateAV = new Date(
                    responses.data.availableDateAndTimes[i].date
                  );
                  let formatedavDate =
                    dateAV.getFullYear() +
                    ',' +
                    (dateAV.getMonth() + 1) +
                    ',' +
                    dateAV.getDate();
                  availableDates.push(new Date(formatedavDate).toString());
                }
                setAvailableTimes(availabletIMES);

                let startDate = new Date(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.minDays * 86400000
                  )
                );
                let formatedDate =
                  startDate.getFullYear() +
                  ',' +
                  (startDate.getMonth() + 1) +
                  ',' +
                  startDate.getDate();

                setAvailableDates(availableDates);

                let currentDate = new Date(formatedDate);
                let stopDate = new Date(
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
                        new Date(formatedCurrentDateString).toString()
                      ) === -1
                    ) {
                      disabledDates.push(new Date(currentDate));
                    }
                  }
                  setDisabledDate(disabledDates);
                  currentDate = new Date(
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
            let sampleData={
              startDate: new Date(
                new Date().setTime(
                  new Date().getTime() +
                    advancedRestrictionData.minDays * 86400000
                )
              ),
              endDate: new Date(
                new Date().setTime(
                  new Date().getTime() +
                    advancedRestrictionData.maxDays * 86400000
                )
              ),
              requestTypeId: data.appointemntType,
              officeId: parseInt(siteInfo.offceId),
              noOfApplicants: parseInt(data.numberOfApplicants),
            };
            console.log(sampleData);
            axios({
              headers: headers,
              method: 'post',
              url:
                baseUrl +
                '/Schedule/api/V1.0/Schedule/GetAvailableDateAndTimes',
              data: {
                startDate: new Date(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.minDays * 86400000
                  )
                ),
                endDate: new Date(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.maxDays * 86400000
                  )
                ),
                requestTypeId: data.appointemntType,
                officeId: parseInt(siteInfo.offceId),
                noOfApplicants: parseInt(data.numberOfApplicants),
              },
            })
              .then((responses) => {
                debugger;
                console.log(responses.data.availableDateAndTimes);
                for (
                  let i = 0;
                  i < responses.data.availableDateAndTimes.length;
                  i++
                ) {
                  availabletIMES.push(responses.data.availableDateAndTimes[i]);
                  let dateAV = new Date(
                    responses.data.availableDateAndTimes[i].date
                  );
                  let formatedavDate =
                    dateAV.getFullYear() +
                    ',' +
                    (dateAV.getMonth() + 1) +
                    ',' +
                    dateAV.getDate();
                  availableDates.push(new Date(formatedavDate).toString());
                }
                setAvailableTimes(availabletIMES);

                let startDate = new Date(
                  new Date().setTime(
                    new Date().getTime() +
                      advancedRestrictionData.minDays * 86400000
                  )
                );
                let formatedDate =
                  startDate.getFullYear() +
                  ',' +
                  (startDate.getMonth() + 1) +
                  ',' +
                  startDate.getDate();

                setAvailableDates(availableDates);

                let currentDate = new Date(formatedDate);
                let stopDate = new Date(
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
                        new Date(formatedCurrentDateString).toString()
                      ) === -1
                    ) {
                      disabledDates.push(new Date(currentDate));
                    }
                  }
                  setDisabledDate(disabledDates);
                  currentDate = new Date(
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
          }
        })
        .catch((error) => {
          debugger;
          console.log('error' + error);
        });
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
      let formatedSelectedDate =
        date.getFullYear() + ',' + (date.getMonth() + 1) + ',' + date.getDate();
      
      for (let i = 0; i < availableTimes.length; i++) {
        let dateAV = new Date(availableTimes[i].date);
        let formatedavDate =
          dateAV.getFullYear() +
          ',' +
          (dateAV.getMonth() + 1) +
          ',' +
          dateAV.getDate();
        let stringDate = new Date(formatedSelectedDate).toString();
        let stringFormatedavDate = new Date(formatedavDate).toString();
        if (stringFormatedavDate === stringDate) {
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
      <MDBContainer className=" pt-3" fluid>
        <h3 className="heading-secondary">AppointmentDateAndTime</h3>
        {data.isGroup ? null : (
          <div>
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={isUrgentAppointment}
                  onChange={() => handleIsUrgent()}
                  name="checkedB"
                />
              }
              label="Does the request urgent?"
            />

            {isUrgentAppointment ? (
              <MDBTypography note noteColor="danger" noteTitle="Notice: ">
                Request for urgent may be considered if the purpose of travel is
                for medical or legal emergency purposes, death in the family,
                etc
              </MDBTypography>
            ) : (
              <MDBTypography
                note
                noteColor="info"
                noteTitle={`Notification: ${durationLength} `}
              >
                Estimated Delivery date is within {durationLength} days{' '}
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
        )}
        <MDBRow key={key}>
          <MDBCol md="6">
            <h3>Date</h3>
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
                      new Date().getTime() + respone.maxDays * 86400000
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
              <h3>Time</h3>
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
        ) : null}
      </MDBContainer>
    </div>
  );
});
export default MyApp;
