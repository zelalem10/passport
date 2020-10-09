import * as types from '../actions/actionTypes';

export default function appointmentReducer(appointmentTypes = [], action) {
  switch (action.type) {
    case types.ADD_APPOINTMENT_TYPE:
      return [...appointmentTypes, { ...action.appointmentTypes }];
    default:
      return appointmentTypes;
  }
}
