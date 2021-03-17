import * as types from './actionTypes';
export default function deletePersonalInfo(personalInfo) {
  return { type: types.DELET_PERSONAL_INFO, personalInfo };
}
