import * as types from '../actions/actionTypes';
export default function travelPlan(state = [], action) {
  switch (action.type) {
    case types.ADD_TRAVEL_PLAN:
      return [...state, { ...action.travelPlan }];
      case types.DELETE_TRAVEL_INFO:
        return state=[];
    default:
      return state;
  }
}