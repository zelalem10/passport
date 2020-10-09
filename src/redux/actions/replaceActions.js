import * as types from './actionTypes';
export default function resonsForReplacment(replacmentReason) {
  return { type: types.ADD_REPLACMENT_REASON, replacmentReason };
}
