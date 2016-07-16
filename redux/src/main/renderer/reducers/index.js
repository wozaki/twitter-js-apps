import { combineReducers } from 'redux';
import account from './account';
import errorMessage from './error-message';
import favorites from './favorites';
import followers from './followers';
import following from './following';
import timeline from './timeline';
import myTimeline from './my-timeline';

const rootReducer = combineReducers({
  account,
  errorMessage,
  favorites,
  followers,
  following,
  timeline,
  myTimeline
});

export default rootReducer;
