import * as types from '../actionTypes';
export default function addGroupPersonalInfo(groupPersonalInfo) {
  return { type: types.ADD_GROUP_PERSONAL_INFO, groupPersonalInfo };
}