import { combineReducers } from 'redux';
import service from './serviceReducer';
import familyReducer from './familyReducer';
import userData from './authentication';

const rootReducer = combineReducers({
  service,
  familyReducer,
  userData,
});
export default rootReducer;
