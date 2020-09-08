import { combineReducers } from 'redux';
import service from './serviceReducer';
import family from './familyReducer';
import appointmentDate from './appointmentDateReducer';
import replacment from './replacmentReducers';
import familyReducer from './familyReducer';
import personalInfoReducer from './personalInfoReducer'
import address from './addressReducer'
import travelPlan from './travelPlanReducer'
import groupPersonalInfo from './GroupRequest/groupPersonalInfoReducer'
import applicationList from './applicationListReducer';
import commonData from './commonDataReducer';
const rootReducer = combineReducers({
  service,
  familyReducer,
  personalInfoReducer,
  family,
  appointmentDate,
  replacment,
  applicationList,
  address,
  travelPlan,
  groupPersonalInfo,
  commonData,
});
export default rootReducer;
