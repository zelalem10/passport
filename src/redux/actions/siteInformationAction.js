import * as types from './actionTypes';
export default function saveSiteInformation(siteInfo) {
  return { type: types.SAVE_SITE_INFORMATION, siteInfo };
}
