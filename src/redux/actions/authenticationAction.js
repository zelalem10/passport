import * as types from './actionTypes';

export function authentication(userData) {
  return { type: types.LOGIN_USER_DATA, userData };
}
