import * as types from './actionTypes';
export default function addPriceInfo(priceInfo) {
  return { type: types.PRICE_INFO, priceInfo };
}