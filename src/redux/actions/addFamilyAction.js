import * as types from './actionTypes';
export default function addFamily(family) {
  return { type: types.ADD_FAMILY, family };
}
