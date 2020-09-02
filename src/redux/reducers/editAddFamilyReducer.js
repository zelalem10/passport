import * as types from '../actions/actionTypes';
export default function editAddFamilyDataReducer(state = [], action) {
  debugger;
  switch (action.type) {
    case types.ADD_EDIT_FAMILY:
      return [...state, [...action.editFamilyData]];
    default:
      return state;
  }
}
