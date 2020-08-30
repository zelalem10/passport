import * as types from './actionTypes';
export default function addTravelPlan(travelPlan) {
  return { type: types.ADD_TRAVEL_PLAN, travelPlan };
}