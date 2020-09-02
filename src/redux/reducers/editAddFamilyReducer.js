import * as types from '../actions/actionTypes';
export default function editAddFamilyDataReducer(state = [], action) {
  debugger;
  switch (action.type) {
    case types.ADD_EDIT_FAMILY:
      return [...state, [...action.editFamilyData]];

    case types.DELETE_EDIT_FAMILY:
      return state.filter(
        (fam) => fam[action.editFamilyData] !== action.editFamilyData
      );
    case types.UPDATE_EDIT_FAMILY:
      return [
        ...state.filter((state) => state.id !== action.editFamilyData.id),
        Object.assign({}, action.editFamilyData),
      ];
    default:
      return state;
  }
}
