import { combineReducers } from 'redux';
import service from './serviceReducer';
import appointmentDate from './appointmentDateReducer';
import replacment from './replacmentReducers';
import familyReducer from './familyReducer';
import userData from './authentication';
import attachmentData from './attachimentReducer'

import personalInfoReducer from './personalInfoReducer'
import address from './addressReducer'
import travelPlan from './travelPlanReducer'
import groupPersonalInfo from './GroupRequest/groupPersonalInfoReducer'
import applicationList from './applicationListReducer';
import editFamilyData from './editAddFamilyReducer';
import commonData from './commonDataReducer';
const rootReducer = combineReducers({
  service,
  familyReducer,
  userData,
  personalInfoReducer,
  appointmentDate,
  replacment,
  applicationList,
  address,
  travelPlan,
  groupPersonalInfo,
  attachmentData,
  editFamilyData,
  commonData,
});
export default rootReducer;
