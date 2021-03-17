import * as types from './actionTypes';
export default function clearFamily(family) {
  return { type: types.DELET_FAMILY_INFO, family };
}
