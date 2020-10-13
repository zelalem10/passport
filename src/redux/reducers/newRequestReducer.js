import * as types from '../actions/actionTypes';
export default function newRequest(state = [], action) {
  switch (action.type) {
    case types.ADD_NEW_REQUEST:
      return [...state, { ...action.request }];
    default:
      return state;
  }
}