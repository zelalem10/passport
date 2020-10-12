import * as types from '../actions/actionTypes';
export default function siteInfoReducer(siteInformation = [], action) {
  switch (action.type) {
    case types.SAVE_SITE_INFORMATION:
      return [...siteInformation, { ...action.siteInfo }];
    default:
      return siteInformation;
  }
}
