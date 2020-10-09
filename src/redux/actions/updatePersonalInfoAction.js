import * as types from './actionTypes';
export default function updatePersonalInfo(personalInfo) {
  return { type: types.UPDATE_PERSONAL_INFO, personalInfo };
}
