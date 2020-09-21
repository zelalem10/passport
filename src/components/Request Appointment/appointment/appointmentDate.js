import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';
import AvailableTimeSlot from './appointmetTimeSlots';
import './disabledates.css';
import { useDispatch, useSelector } from 'react-redux';
import addAppointmentDate from '../../../redux/actions/addAppointmetntDate';

function MyApp() {
  const [state, setState] = useState({ date: new Date(), time: '' });
  const [respone, setResponse] = useState({});
  const [disabledDate, setDisabledDate] = useState([]);
  const [availableDatess, setAvailableDates] = useState([]);
  const [key, setKey] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);
  const [showAvailableTimeSlots, setShowAvailableTimeSlots] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [activeTimeSlot, setActiveTImeSlot] = useState({
    key: '',
    active: false,
  });

  const toggleClass = (e) => {
    const currentState =
      e.target.className === 'btn_select active' ? true : false;
    setActiveTImeSlot({ key: e.target.id, active: !currentState });
  };
 const saveNewAppointment = () => {
   debugger;
    let formatedYear = state.date.getFullYear();
    let formatedMonth = (1 + state.date.getMonth()).toString();
    formatedMonth =
      formatedMonth.length > 1 ? formatedMonth : '0' + formatedMonth;
    let formatedDay = state.date.getDate().toString();
    formatedDay = formatedDay.length > 1 ? formatedDay : '0' + formatedDay;
    let stringDateValue = `${formatedYear}-${formatedMonth}-${formatedDay}`;
    axios({
      headers: {
        Authorization: 'Bearer ' + accesstoken,
      },
      method: 'post',
      url: baseUrl + '/Schedule/api/V1.0/Schedule/SubmitAppointment',
      data: {
  id: 0,
  date: stringDateValue,
  requestId: 3,
  durationId: parseInt(selectTime) ,
        dateTimeFormat: 'yyyy-MM-dd',
      },
    })
      .then((response) => {
        let newdate = new Date(response.data.date);
        let newYear = newdate.getFullYear();
        let newMonth = (1 + newdate.getMonth()).toString();
        newMonth = newMonth.length > 1 ? newMonth : '0' + newMonth;
        let newDay = newdate.getDate().toString();
        newDay = newDay.length > 1 ? newDay : '0' + newDay;
        
        
      })
      .catch((error) => {
        console.log('error' + error);
      });
  };
  const dispatch = useDispatch();
  const accesstoken = localStorage.systemToken;
  const baseUrl = 'https://epassportservices.azurewebsites.net/';
  const availableDates = [];
  let advancedRestrictionData = {};
  let disabledDates = [];
  let availabletIMES = [];

  const handleTimeSelect = (e) => {
    setState({ ...state, time: e.target.value });
    setSelectTime(e.target.id);
    toggleClass(e);
    dispatch(addAppointmentDate({ ...state, time: e.target.id }));
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
        debugger;
        advancedRestrictionData = response.data.advancedRestrictions[0];
        setResponse(response.data.advancedRestrictions[0]);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accesstoken,
        };
        axios({
          headers: headers,
          method: 'post',
          url: baseUrl + '/Schedule/api/V1.0/Schedule/GetAvailableDateAndTimes',
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
            requestTypeId: 2,
            officeId: 7,
          },
        })
          .then((responses) => {
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
      })
      .catch((error) => {
        console.log('error' + error);
      });
  }, []);
  const onChange = (date) => {
    debugger;
    setState({ ...state, date: date });
    showTimeSlots(date);
    dispatch(addAppointmentDate({ ...state, date: date }));
  };
  const showTimeSlots = (date) => {
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
  };
  const dateValue = state.date.toString();
  return (
    <div>
      <MDBContainer className=" pt-3" fluid>
        <h2 className="h1">Appointment - Date and Time</h2>
        <MDBRow key={key}>
          <MDBCol md="6">
            <h3>Date</h3>
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
          </MDBCol>
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
        </MDBRow>
         <MDBRow>
          <MDBCol md="6" className="pt-3 center">
            <button
              onClick={saveNewAppointment}
              type="button"
              class="btn btn-default btn-lg btn-block"
            >
              Save New Date Time
            </button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
export default MyApp;
