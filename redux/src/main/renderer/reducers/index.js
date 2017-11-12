import { combineReducers } from 'redux';
import accounts from './accounts';
import columns from './columns';
import errorMessage from './error-message';
import favorites from './favorites';
import followers from './followers';
import following from './following';
import lists from './lists';
import mediaToTweet from './mediaToTweet';
import modal from './modal';
import timeline from './timeline';
import tweetsInList from './tweets-in-list';
import users from './users';
import userTimeline from './user-timeline';

const rootReducer = combineReducers({
  accounts,
  columns,
  errorMessage,
  favorites,
  followers,
  following,
  lists,
  mediaToTweet,
  modal,
  timeline,
  tweetsInList,
  users,
  userTimeline,
});

export default rootReducer;
