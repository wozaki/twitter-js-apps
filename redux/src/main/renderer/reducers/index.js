import { combineReducers } from 'redux';
import account from './account';
import favorites from './favorites';
import timeline from './timeline';

const rootReducer = combineReducers({
  account,
  favorites,
  timeline
});

export default rootReducer;
