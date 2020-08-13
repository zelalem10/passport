export default function serviceReducer(state = [], action) {
  switch (action.type) {
    case 'SELECT_SERVICE':
      return [...state, ...action.service];
    default:
      return state;
  }
}
