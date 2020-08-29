import { combineReducers } from 'redux';
import service from './serviceReducer';
import family from './familyReducer';
import appointmentDate from './appointmentDateReducer';
import replacment from './replacmentReducers';
import familyReducer from './familyReducer';
import personalInfoReducer from './personalInfoReducer'
import address from './addressReducer'
import groupPersonalInfo from './GroupRequest/groupPersonalInfoReducer'
import personalInfoReducer from './personalInfoReducer';
import applicationList from './applicationListReducer';
const rootReducer = combineReducers({
  service,
  familyReducer,
  personalInfoReducer,
  family,
  appointmentDate,
  replacment,
  applicationList,
  address,
  groupPersonalInfo,
});
export default rootReducer;
