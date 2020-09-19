import * as types from './actionTypes';
export default function addPaymentOptionId(paymentOptionId) {
  return { type: types.ADD_PAYMENT_OPTIONID, paymentOptionId };
}