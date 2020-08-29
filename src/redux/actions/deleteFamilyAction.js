import * as types from './actionTypes';
export function deleteFamily(family) {
  return { type: types.DELETE_FAMILY, family };
}
