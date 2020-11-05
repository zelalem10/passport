import * as types from './actionTypes';
export default function deleteRequestInfo (request) {
  return { type: types.DELET_REQUEST, request };
}