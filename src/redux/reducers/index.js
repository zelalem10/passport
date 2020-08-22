import { combineReducers } from 'redux';
import service from './serviceReducer';
const rootReducer = combineReducers({
  service,
});
export default rootReducer;
