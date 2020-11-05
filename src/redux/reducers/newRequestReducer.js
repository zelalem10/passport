import * as types from '../actions/actionTypes';
export default function newRequest(state = [], action) {
  switch (action.type) {
    case types.ADD_NEW_REQUEST:
      return [...state, { ...action.request }];
      case types.DELET_REQUEST:
        return  state = [];
    default:
      return state;
  }
}
