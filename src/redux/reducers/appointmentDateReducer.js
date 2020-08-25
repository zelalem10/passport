import * as types from '../actions/actionTypes';
export default function appointmentDate(dateTime = [], action) {
  debugger;
  switch (action.type) {
    case types.ADD_APPOINTMENT_DATE:
      return [...dateTime, { ...action.dateTime }];
    default:
      return dateTime;
  }
}
