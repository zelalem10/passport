import * as types from '../actions/actionTypes';
export default function commonData(state = [], action) {
  switch (action.type) {
    case types.ADD_COMMON_DATA:
      return [...state, { ...action.commonData
     }];
    default:
      return state;
  }
}