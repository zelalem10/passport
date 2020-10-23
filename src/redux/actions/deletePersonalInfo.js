import * as types from './actionTypes';
export function deletePersonalInfo(personalInfo) {
  return { type: types.DELET_PERSONAL_INFO, personalInfo };
}
