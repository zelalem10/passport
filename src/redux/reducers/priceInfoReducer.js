import * as types from '../actions/actionTypes';
export default function priceInfo(state = [], action) {
  switch (action.type) {
    case types.PRICE_INFO:
      return [...state, { ...action.priceInfo
     }];
    default:
      return state;
  }
}