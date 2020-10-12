import * as types from './actionTypes';
export default function addAttachement(attachement) {
  return { type: types.ADD_ATTACHMENT_INFO, attachement };
}