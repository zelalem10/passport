import { combineReducers } from 'redux';
import service from './serviceReducer';
import familyReducer from './familyReducer';
import personalInfoReducer from './personalInfoReducer'
const rootReducer = combineReducers({
  service,
  familyReducer,
  personalInfoReducer,
});
export default rootReducer;
