import * as types from '../actions/actionTypes';
import produce from 'immer';

export default function personalInfoReducer(state = [], action) {
  switch (action.type) {
    case types.ADD_PERSONAL_INFO:
      return [...state, { ...action.personalInfo }];
    case types.UPDATE_PERSONAL_INFO:
      state.map((person) => {
        return person.id == action.personalInfo.id
          ? { ...person, firstName: action.personalInfo.firstName }
          : person;
      });
      case types.DELET_PERSONAL_INFO:
        return state=[];
    default:
      return state;
  }
}
