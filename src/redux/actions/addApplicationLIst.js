import * as types from './actionTypes';
export default function addApplicationList(appList) {
  return { type: types.ADD_APPLICATION_LIST, appList };
}
