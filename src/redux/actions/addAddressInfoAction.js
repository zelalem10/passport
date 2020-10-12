import * as types from './actionTypes';
export default function addAddressInfo(address) {
  return { type: types.ADD_ADDRESS_INFO, address };
}