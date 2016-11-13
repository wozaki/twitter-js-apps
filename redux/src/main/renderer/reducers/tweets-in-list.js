import { RECEIVED_FIRST_TWEETS_IN_LIST, RECEIVED_OLDER_TWEETS_IN_LIST } from '../constants/ActionTypes';

const initialState = { tweets: [] };

export default function tweetsInList(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_FIRST_TWEETS_IN_LIST:
      return {
        tweets: action.tweets
      };

    case RECEIVED_OLDER_TWEETS_IN_LIST:
      return {
        tweets: state.tweets.concat(action.tweets)
      };

    default:
      return state;
  }
}