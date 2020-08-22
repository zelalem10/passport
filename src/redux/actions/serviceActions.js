import * as types from './actionTypes';
export function selectService(service) {
  return { type: types.SELECT_SERVICE, service };
}
