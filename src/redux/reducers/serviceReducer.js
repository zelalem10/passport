import * as types from '../actions/actionTypes';
export default function serviceReducer(state = [], action) {
  switch (action.type) {
    case types.SELECT_SERVICE:
      return [...state, { ...action.service }];
    default:
      return state;
  }
}
