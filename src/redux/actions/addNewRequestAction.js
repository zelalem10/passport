import * as types from './actionTypes';
export default function addNewRequest(request) {
  return { type: types.ADD_NEW_REQUEST, request };
}