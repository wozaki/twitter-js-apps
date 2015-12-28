import { combineReducers } from 'redux';
import account from './account';
import timeline from './timeline';

const rootReducer = combineReducers({
  account,
  timeline
});

export default rootReducer;
