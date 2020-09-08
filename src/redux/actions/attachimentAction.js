import * as types from './actionTypes';

export function attachimentAction(attachmentData) {
  return { type: types.ATTACHIMENT, attachmentData };
}