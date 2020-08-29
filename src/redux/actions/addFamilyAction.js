import * as types from './actionTypes';
export function addFamily(family) {
  return { type: types.ADD_FAMILY, family };
}
