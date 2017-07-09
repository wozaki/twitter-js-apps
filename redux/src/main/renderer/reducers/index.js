import { combineReducers } from 'redux';
import accounts from './accounts';
import errorMessage from './error-message';
import favorites from './favorites';
import followers from './followers';
import following from './following';
import lists from './lists';
import mediaToTweet from './mediaToTweet';
import timeline from './timeline';
import tweetsInList from './tweets-in-list';
import users from './users';
import userTimeline from './user-timeline';

const rootReducer = combineReducers({
  accounts,
  errorMessage,
  favorites,
  followers,
  following,
  lists,
  mediaToTweet,
  timeline,
  tweetsInList,
  users,
  userTimeline,
});

export default rootReducer;
