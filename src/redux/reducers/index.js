import { combineReducers } from 'redux';
import service from './serviceReducer';
import family from './familyReducer';
import appointmentDate from './appointmentDateReducer';
import replacment from './replacmentReducers';
import familyReducer from './familyReducer';
import personalInfoReducer from './personalInfoReducer'
const rootReducer = combineReducers({
  service,
  familyReducer,
  personalInfoReducer,
  family,
  appointmentDate,
  replacment,
});
export default rootReducer;
