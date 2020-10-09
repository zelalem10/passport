import * as types from '../actions/actionTypes';
export default function attachement(state = [], action) {
  switch (action.type) {
    case types.ADD_ATTACHMENT_INFO:
      return [...state, action.attachement ];
    default:
      return state;
  }
}