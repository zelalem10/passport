import * as types from '../actions/actionTypes';
import produce from 'immer';

export default function personalInfoReducer(state = [], action) {
  switch (action.type) {
    case types.ADD_PERSONAL_INFO:
      return [...state, { ...action.personalInfo }];
    case types.UPDATE_PERSONAL_INFO:
      state.map((person) => {
        return person.id == action.personalInfo.id
          ? { ...person, firstName: action.personalInfo.firstName }
          : person;
      });

    // return produce(state, (draft) => {
    //   draft = action.personalInfo;
    // });

    // {
    //   const newArray = [...state];
    //   const updatedArray = [
    //     ...newArray.filter((person) => person.id !== action.personalInfo.id),
    //     Object.assign({}, action.personalInfo),
    //   ];
    //   return [...state, { ...updatedArray }];
    // }

    // state.map((value, index) => {
    //   if (value.id == action.personalInfo.id) {
    //     value.firstName = action.personalInfo.firstName;
    //     return value;
    //   }
    //   return value;
    // });

    default:
      return state;
  }
}
