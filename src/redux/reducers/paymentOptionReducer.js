import * as types from '../actions/actionTypes';
export default function paymentOption(state = [], action) {
  switch (action.type) {
    case types.ADD_PAYMENT_OPTIONID:
      return [...state, { ...action.paymentOption
     }];
    default:
      return state;
  }
}