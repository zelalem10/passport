import * as types from '../actions/actionTypes';
export default function family(family = [], action) {
  switch (action.type) {
    case types.ADD_FAMILY:
      return [...family, [...action.family]];
    case types.DELETE_FAMILY:
      return family.filter((fam) => fam.id !== action.family);
    case types.EDIT_FAMILY:
      return [
        ...family.filter((family) => family.id !== action.family.id),
        Object.assign({}, action.family),
      ];
      case types.DELET_FAMILY_INFO:
        return family=[];

    default:
      return family;
  }
}
