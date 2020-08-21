import * as types from '../actions/actionTypes';
export default function familyReducer(family = [], action) {
  switch (action.type) {
    case types.ADD_FAMILY:
      return [...family, { ...action.family }];
    case types.DELETE_FAMILY:
      return [
        ...family,
        family.items.filter((item, index) => index !== action.family),
      ];
    default:
      return family;
  }
}
