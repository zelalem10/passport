import { combineReducers } from 'redux';
import service from './serviceReducer';
import family from './familyReducer';
import appointmentDate from './appointmentDateReducer';
import replacment from './replacmentReducers';
const rootReducer = combineReducers({
  service,
  family,
  appointmentDate,
  replacment,
});
export default rootReducer;
