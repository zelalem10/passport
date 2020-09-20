import * as types from './actionTypes';
export default function addPaymentOptionId(paymentOption) {
  return { type: types.ADD_PAYMENT_OPTIONID, paymentOption };
}