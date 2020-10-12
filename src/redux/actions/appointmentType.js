import * as types from './actionTypes';
export default function addAppointmentType(appointmentTypes) {
  return { type: types.ADD_APPOINTMENT_TYPE, appointmentTypes };
}
