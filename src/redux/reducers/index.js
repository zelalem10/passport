import { combineReducers } from 'redux';
import service from './serviceReducer';
import familyReducer from './familyReducer';
const rootReducer = combineReducers({
  service,
  familyReducer,
});
export default rootReducer;
