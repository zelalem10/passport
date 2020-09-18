import * as types from './actionTypes';
export default function addCommonData(commonData) {
  return { type: types.ADD_COMMON_DATA, commonData };
}