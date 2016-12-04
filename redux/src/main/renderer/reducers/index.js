import { combineReducers } from 'redux';
import accounts from './accounts';
import errorMessage from './error-message';
import favorites from './favorites';
import followers from './followers';
import following from './following';
import lists from './lists';
import timeline from './timeline';
import tweetsInList from './tweets-in-list';
import users from './users';
import myTimeline from './my-timeline';

const rootReducer = combineReducers({
  accounts,
  errorMessage,
  favorites,
  followers,
  following,
  lists,
  timeline,
  tweetsInList,
  users,
  myTimeline
});

export default rootReducer;
