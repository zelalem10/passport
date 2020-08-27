import * as types from './actionTypes';
export default function addAppointmentDate(dateTime) {
  return { type: types.ADD_APPOINTMENT_DATE, dateTime };
}
