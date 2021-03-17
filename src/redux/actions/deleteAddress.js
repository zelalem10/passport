import * as types from './actionTypes';
export default function deleteAddressInfo(addressInfo) {
  return { type: types.DELET_ADDRESS_INFO, addressInfo };
}
