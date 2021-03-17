import * as types from './actionTypes';
export default function deleteTravelInfo(travelInfo) {
  return { type: types.DELETE_TRAVEL_INFO, travelInfo };
}
