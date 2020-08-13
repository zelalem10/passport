import React, { Component, useState } from 'react';
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
  const [timeSlots, setTimeSlots] = useState([]);
  const [showAvailableTimeSlots, setShowAvailableTimeSlots] = useState(false);
  //   const options = {
  //     headers: {
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk3MTQ4MTQyLCJleHAiOjE1OTcxNjI1NDIsImlhdCI6MTU5NzE0ODE0Mn0.ZyY_IPzH7IhXzqICScGkgxrR1SMkHoo-BFHFTB1G_EY',
  //     },
  //     method: 'get',
  //     url: 'http://svdrbas03:2222/Master/api/V1.0/AdvancedRestriction/GetAll',
  //   };
  //   axios(options).then((response) => {
  //     setResponse(response.data.advancedRestrictions[0]);
  //   });

  const onChange = (date) => {
    setState({ date });
    showTimeSlots(date);
  };
  const showTimeSlots = (date) => {
    setTimeSlots(['5:20 AM', '2:45 PM', '3:15 PM', '4:35 PM']);
    setShowAvailableTimeSlots(true);
  };
  const availableDates = [
    new Date(2020, 7, 16).toString(),
    new Date(2020, 7, 5).toString(),
  ];
  let disabledDates = [];
  const getDates = (startDate, stopDate) => {
    var currentDate = startDate;
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

      currentDate = new Date(
        new Date().setTime(currentDate.getTime() + 1 * 86400000)
      );
    }
  };

  let startDate = new Date(
    new Date().setTime(new Date().getTime() + 3 * 86400000)
  );
  let formatedDate =
    startDate.getFullYear() +
    ',' +
    (startDate.getMonth() + 1) +
    ',' +
    startDate.getDate();
  getDates(
    new Date(formatedDate),
    new Date(new Date().setTime(new Date().getTime() + 5 * 86400000))
  );
  const dateValue = state.date.toString('dddd, dd MMMM yyyy');
  return (
    <div>
      <MDBContainer className="passport-container pt-3" fluid>
        <h2 className="h1">Appointment - Date and Time</h2>
        <MDBRow>
          <MDBCol md="6">
            <h3>Date</h3>
            <Calendar
              allowPartialRange
              onChange={onChange}
              value={state.date}
              minDate={
                new Date(
                  new Date().setTime(new Date().getTime() + 3 * 86400000)
                )
              }
              maxDate={
                new Date(
                  new Date().setTime(new Date().getTime() + 5 * 86400000)
                )
              }
              tileDisabled={({ date, view }) =>
                view === 'month' && // Block day tiles only
                disabledDates.some(
                  (disabledDate) =>
                    date.getFullYear() === disabledDate.getFullYear() &&
                    date.getMonth() === disabledDate.getMonth() &&
                    date.getDate() === disabledDate.getDate()
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
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
export default MyApp;
