import * as types from '../../actions/actionTypes';
export default function groupPersonalInfo(state = [], action) {
  switch (action.type) {
    case types.ADD_GROUP_PERSONAL_INFO:
      return [...state, { ...action.groupPersonalInfo }];
    default:
      return state;
  }
}
