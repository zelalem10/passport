import * as types from './actionTypes';
export default function deleteApplicationList(applicationList) {
  return { type: types.DELETE_APPLICATION_LIST, applicationList };
}
