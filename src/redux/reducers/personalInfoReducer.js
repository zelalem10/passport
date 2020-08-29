import * as types from '../actions/actionTypes';
export default function personalInfoReducer(state = [], action) {
  switch (action.type) {
    case types.ADD_PERSONAL_INFO:
      return [...state, { ...action.personalInfo }];
    default:
      return state;
  }
}
