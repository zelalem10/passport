import * as types from '../actions/actionTypes';
export default function familyType(familyTypes = [], action) {
  switch (action.type) {
    case types.FAMILY_TYPE:
      return [...familyTypes, { ...action.commonData
     }];
    default:
      return familyTypes;
  }
}