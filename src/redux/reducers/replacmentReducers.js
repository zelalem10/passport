import * as types from '../actions/actionTypes';
export default function replacmentReducer(replacmentReason = [], action) {
  switch (action.type) {
    case types.ADD_REPLACMENT_REASON:
      return [...replacmentReason, { ...action.replacmentReason }];
    default:
      return replacmentReason;
  }
}
