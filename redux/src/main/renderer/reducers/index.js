import { combineReducers } from 'redux';
import account from './account';
import favorites from './favorites';
import timeline from './timeline';
import myTimeline from './my-timeline';

const rootReducer = combineReducers({
  account,
  favorites,
  timeline,
  myTimeline
});

export default rootReducer;
