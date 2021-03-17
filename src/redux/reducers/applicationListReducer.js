import * as types from '../actions/actionTypes';
export default function applicationList(appList = [], action) {
  switch (action.type) {
    case types.ADD_APPLICATION_LIST:
      return [...appList, { ...action.appList }];
      case types.DELETE_APPLICATION_LIST:
        return appList=[];
    default:
      return appList;
  }
}
