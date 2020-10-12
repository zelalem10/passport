import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MDBContainer, MDBRow, MDBCol, MDBAlert } from 'mdbreact';
import axios from 'axios';
import AvailableTimeSlot from './appointmetTimeSlots';
import { useDispatch, useSelector } from 'react-redux';
import addAppointmentDate from '../../../redux/actions/addAppointmetntDate';

function RescheduleAppointment(props) {
  const { handleDisplayId } = props;
  const counter = useSelector((state) => state);
  const appList = counter.applicationList[counter.applicationList.length - 1];
  const [isUrgentAppointment, setIsUrgentAppointment] = useState(false);
  const [availableDateAndQota, setavailableDateAndQota] = useState([]);
  let displayedApplication = {};
  const { displayRequestId } = props;

  for (let item in appList) {
    if (appList[item].requestId == handleDisplayId) {
      displayedApplication = appList[item];
    }
  }
  let appointmentDetails = displayedApplication.appointmentResponse;

  let officeId = displayedApplication ? displayedApplication.officeId : null;
  if (displayedApplication.requestMode == 1 && !isUrgentAppointment) {
    setIsUrgentAppointment(true);
  }
  let requestTypeId = displayedApplication.requestTypeId;
  let dateAppointmentDetails = new Date(appointmentDetails.date);
  let year = dateAppointmentDetails.getFullYear();
  let month = (1 + dateAppointmentDetails.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  let day = dateAppointmentDetails.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  const [state, setState] = useState({ date: new Date(), time: '' });
  const [previousAppointment, setPreviousAppointment] = useState(
    displayedApplication ? `${year} - ${month} - ${day}` : ''
  );

  const [respone, setResponse] = useState({});
  const [disabledDate, setDisabledDate] = useState([]);
  const [availableDatess, setAvailableDates] = useState([]);
  const [key, setKey] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isOnLoad, setIsOnLoad] = useState(true);

  const [timeSlots, setTimeSlots] = useState([]);
  const [showAvailableTimeSlots, setShowAvailableTimeSlots] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [activeTimeSlot, setActiveTImeSlot] = useState({
    key: '',
    active: false,
  });
  const [
    rescheduleNotAllowedMessage,
    setRescheduleNotAllowedMessage,
  ] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);
  const [newAppointment, setNewAppointment] = useState();
  const [newDisplayTime, setNewDisplayTime] = useState('');
  const toggleClass = (e) => {
    const currentState =
      e.target.className === 'btn_select active' ? true : false;
    setActiveTImeSlot({ key: e.target.id, active: !currentState });
  };

  const dispatch = useDispatch();
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
  const baseUrl = 'https://epassportservices.azurewebsites.net/';
  const availableDates = [];
  let advancedRestrictionData = {};
  let disabledDates = [];
  let availabletIMES = [];

  const handleTimeSelect = (e) => {
    setState({ ...state, time: e.target.value });
    setSelectTime(e.target.id);
    toggleClass(e);
    dispatch(addAppointmentDate({ ...state, time: e.target.value }));
  };
  useEffect((two = 2) => {
    axios({
      headers: {
        Authorization: 'Bearer ' + accesstoken,
      },
      method: 'get',
      url: baseUrl + '/Master/api/V1.0/AdvancedRestriction/GetAll',
    })
      .then(async (response) => {
        advancedRestrictionData = response.data.advancedRestrictions[0];
        setResponse(response.data.advancedRestrictions[0]);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accesstoken,
        };
        let data = {
          startDate: new Date(
            new Date().setTime(
              new Date().getTime() +
                response.data.advancedRestrictions[0].minDays * 86400000
            )
          ),
          endDate: new Date(
            new Date().setTime(
              new Date().getTime() +
                response.data.advancedRestrictions[0].maxDays * 86400000
            )
          ),
          requestTypeId: requestTypeId,
          officeId: officeId,
          noOfApplicants: 1,
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
                    response.data.advancedRestrictions[0].minDays * 86400000
                )
              ),
              endDate: new Date(
                new Date().setTime(
                  new Date().getTime() +
                    response.data.advancedRestrictions[0].maxDays * 86400000
                )
              ),
              requestTypeId: requestTypeId,
              officeId: officeId,
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
              console.log('error' + error.data.message);
            });
        } else {
          axios({
            headers: headers,
            method: 'post',
            url:
              baseUrl + '/Schedule/api/V1.0/Schedule/GetAvailableDateAndTimes',
            data: {
              startDate: new Date(
                new Date().setTime(
                  new Date().getTime() +
                    response.data.advancedRestrictions[0].minDays * 86400000
                )
              ),
              endDate: new Date(
                new Date().setTime(
                  new Date().getTime() +
                    response.data.advancedRestrictions[0].maxDays * 86400000
                )
              ),
              requestTypeId: requestTypeId,
              officeId: officeId,
              noOfApplicants: 1,
            },
          })
            .then((responses) => {
               ;
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
               ;
              console.log('error' + error);
            });
        }
      })
      .catch((error) => {
        console.log('error' + error);
      });
  }, []);

  const onChange = (date) => {
    setState({ ...state, date: date });
    showTimeSlots(date);
    setIsOnLoad(false);
    dispatch(addAppointmentDate({ ...state, date: date }));
  };
  const showTimeSlots = (date) => {
    if (!isUrgentAppointment) {
      let timeSlotsForSpecificDate = [];
      for (let i = 0; i < availableTimes.length; i++) {
        let dateAV = new Date(availableTimes[i].date);
        let formatedavDate =
          dateAV.getFullYear() +
          ',' +
          (dateAV.getMonth() + 1) +
          ',' +
          dateAV.getDate();
        let stringDate = date.toString();
        let stringFormatedavDate = new Date(formatedavDate).toString();
        if (stringFormatedavDate === stringDate) {
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

      setTimeSlots(timeSlotsForSpecificDate);
      setShowAvailableTimeSlots(true);
    }
  };
  const dateValue = state.date.toString();
  let displayTime = '';
  if (displayedApplication.requestMode == 0) {
    displayTime = state
      ? `${previousAppointment} ${appointmentDetails.duration.startTime} - ${
          appointmentDetails.duration.endTime
        } ${appointmentDetails.duration.isMorning ? 'AM' : 'PM'} 
      `
      : null;
  }
  const saveNewAppointment = () => {
    let formatedYear = state.date.getFullYear();
    let formatedMonth = (1 + state.date.getMonth()).toString();
    formatedMonth =
      formatedMonth.length > 1 ? formatedMonth : '0' + formatedMonth;
    let formatedDay = state.date.getDate().toString();
    formatedDay = formatedDay.length > 1 ? formatedDay : '0' + formatedDay;
    let stringDateValue = `${formatedYear}-${formatedMonth}-${formatedDay}`;
    if (isUrgentAppointment) {
      let urgentQuotaId = 0;
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
      axios({
        headers: {
          Authorization: 'Bearer ' + accesstoken,
        },
        method: 'post',
        url: baseUrl + '/Schedule/api/V1.0/Schedule/SubmitUrgentAppointment',
        data: {
          id: appointmentDetails.id,
          date: stringDateValue,
          dateTimeFormat: 'yyyy-MM-dd',
          urgentQuotaId: urgentQuotaId,
          noOfApplicants: 1,
        },
      })
        .then((response) => {
           ;
          console.log(response.data);
          dispatch(
            addAppointmentDate(response.data.urgentAppointmentResponses)
          );
          if (response.data.urgentAppointmentResponses) {
            setFormCompleted(true);
            setNewAppointment(response.data.urgentAppointmentResponses[0].date);
            setNewDisplayTime(response.data.urgentAppointmentResponses[0].date);
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
           ;
          if (state.date && state.time) {
            setErrorMessage(error.message);
          } else if (state.date && !state.time) {
            setErrorMessage('Please Select Time Interval');
          } else {
            setErrorMessage('Please Select Date and Time Interval');
          }
        });
    } else {
      let sampleData = {
        id: appointmentDetails.id,
        date: stringDateValue,
        requestId: displayedApplication.requestId,
        durationId: parseInt(selectTime),
        dateTimeFormat: 'yyyy-MM-dd',
      };
      console.log(JSON.stringify(sampleData));
      axios({
        headers: {
          Authorization: 'Bearer ' + accesstoken,
        },
        method: 'post',
        url: baseUrl + '/Schedule/api/V1.0/Schedule/RescheduleAppointment',
        data: {
          id: appointmentDetails.id,
          date: stringDateValue,
          requestId: displayedApplication.requestId,
          durationId: parseInt(selectTime),
          dateTimeFormat: 'yyyy-MM-dd',
        },
      })
        .then((response) => {
           ;
          if (response.data.appointmentResp) {
            let newdate = new Date(response.data.appointmentResp.date);
            let newYear = newdate.getFullYear();
            let newMonth = (1 + newdate.getMonth()).toString();
            newMonth = newMonth.length > 1 ? newMonth : '0' + newMonth;
            let newDay = newdate.getDate().toString();
            newDay = newDay.length > 1 ? newDay : '0' + newDay;
            setNewAppointment(newdate);
            setNewDisplayTime(`${newdate.toISOString().substr(0, 10)} ${
              response.data.duration.startTime
            } - ${response.data.duration.endTime} ${
              response.data.duration.isMorning ? 'AM' : 'PM'
            } 
          `);
          } else {
            setRescheduleNotAllowedMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log('error' + error);
        });
    }
  };
  return (
    <div>
      <MDBContainer className="passport-container pt-3" fluid>
        <h4>
          {displayedApplication.requestMode == 0
            ? `Appointment Date - ${displayTime}`
            : `Appointment Date - ${previousAppointment}`}
        </h4>
        {newAppointment ? (
          <MDBAlert color="success">Changed To - {newDisplayTime}</MDBAlert>
        ) : null}
        {rescheduleNotAllowedMessage ? (
          <MDBAlert color="danger">{rescheduleNotAllowedMessage}</MDBAlert>
        ) : null}
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
              />
            </MDBCol>
          ) : null}
        </MDBRow>
        {selectTime ? (
          <MDBRow>
            <MDBCol md="6"></MDBCol>
            <MDBCol md="6" className="pt-3 text-right save-appointment-btn">
              <button
                onClick={saveNewAppointment}
                type="button"
                class="btn btn-default text-white btn-block"
              >
                Save New Date Time
              </button>
            </MDBCol>
          </MDBRow>
        ) : null}
        {isUrgentAppointment && !isOnLoad ? (
          <MDBRow>
            <MDBCol md="6" className="pt-3 text-right save-appointment-btn">
              <button
                onClick={saveNewAppointment}
                type="button"
                class="btn btn-default text-white btn-block"
              >
                Save New Date
              </button>
            </MDBCol>
          </MDBRow>
        ) : null}
      </MDBContainer>
    </div>
  );
}
export default RescheduleAppointment;
