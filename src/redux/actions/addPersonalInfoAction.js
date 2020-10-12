import * as types from './actionTypes';
export default function addPersonalInfo(personalInfo) {
  return { type: types.ADD_PERSONAL_INFO, personalInfo };
}