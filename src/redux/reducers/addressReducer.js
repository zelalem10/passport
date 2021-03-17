import * as types from '../actions/actionTypes';
export default function address(state = [], action) {
  switch (action.type) {
    case types.ADD_ADDRESS_INFO:
      return [...state, { ...action.address }];
      case types.DELET_ADDRESS_INFO:
        return state=[];
    default:
      return state;
  }
}