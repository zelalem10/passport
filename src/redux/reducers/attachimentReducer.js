import * as types from '../actions/actionTypes';

export default function attachimentReducer(state = [], action) {


  switch (action.type) {
    case types.ATTACHIMENT:
      return [...state, { ...action.attachmentData }];    
    default:
      return state;
  }
}