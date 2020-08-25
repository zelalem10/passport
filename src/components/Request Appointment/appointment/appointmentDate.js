import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';
import AvailableTimeSlot from './appointmetTimeSlots';
import './disabledates.css';

function MyApp() {
  const [state, setState] = useState({ date: new Date() });
  const [respone, setResponse] = useState({});
  const [disabledDate, setDisabledDate] = useState([]);
  const [availableDatess, setAvailableDates] = useState([]);
  const [key, setKey] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);
  const [showAvailableTimeSlots, setShowAvailableTimeSlots] = useState(false);
const [selectTime,setSelectTime]=useState();
const [activeTimeSlot,setActiveTImeSlot]=useState({key:'',active:false});


const toggleClass=(e)=> {
  debugger;
  const currentState = e.target.className==='btn_select active'?true:false;
  setActiveTImeSlot( {key:e.target.id,active:!currentState} );
};
console.log(activeTimeSlot);

  const baseUrl = 'http://svdrbas03:2222';
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk3MjEzNTU5LCJleHAiOjE1OTcyMjc5NTksImlhdCI6MTU5NzIxMzU1OX0.IJihXj3WJQEsNjFjYIL8-Z2LmtKvT250dl04L8YmIIw';
  const availableDates = [];
  let advancedRestrictionData = {};
  let disabledDates = [];
  let availabletIMES = [];

  const handleTimeSelect=(e)=>{
    debugger;
    setSelectTime(e.target.value);
    toggleClass(e);
  }
console.log(selectTime);
  useEffect((two = 2) => {
     axios({
      headers: {
        Authorization: 'Bearer ' + token,
      },
      method: 'get',
      url: baseUrl + '/Master/api/V1.0/AdvancedRestriction/GetAll',
    })
      .then(async (response) => {
        advancedRestrictionData = response.data.advancedRestrictions[1];
        setResponse(response.data.advancedRestrictions[1]);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
         axios({
          headers: headers,
          method: 'post',
          url: baseUrl + '/Schedule/api/V1.0/Schedule/GetAvailableDateAndTimes',
          data: {
            startDate: new Date(
              new Date().setTime(
                new Date().getTime() +
                  response.data.advancedRestrictions[1].minDays * 86400000
              )
            ),
            endDate: new Date(
              new Date().setTime(
                new Date().getTime() +
                  response.data.advancedRestrictions[1].maxDays * 86400000
              )
            ),
            requestTypeId: 1,
            officeId: 64,
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
    setState({ date });
    showTimeSlots(date);
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
           time: availableTimes[i].durations[l].startTime +
              ' - ' +
              availableTimes[i].durations[l].endTime,
              id:availableTimes[i].durations[l].id,
              isMorning:availableTimes[i].durations[l].isMorning,
          }
          );
        }
      }
    }

    setTimeSlots(timeSlotsForSpecificDate);
    setShowAvailableTimeSlots(true);
  };
  const dateValue = state.date.toString();
  return (
    <div>
      <MDBContainer className="passport-container pt-3" fluid>
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
      </MDBContainer>
    </div>
  );
}
export default MyApp;
