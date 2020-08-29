import { combineReducers } from 'redux';
import service from './serviceReducer';
import family from './familyReducer';
import appointmentDate from './appointmentDateReducer';
import replacment from './replacmentReducers';
import familyReducer from './familyReducer';
import userData from './authentication';

import personalInfoReducer from './personalInfoReducer';
import applicationList from './applicationListReducer';
const rootReducer = combineReducers({
  service,
  familyReducer,
  userData,
  personalInfoReducer,
  family,
  appointmentDate,
  replacment,
  applicationList,
});
export default rootReducer;
