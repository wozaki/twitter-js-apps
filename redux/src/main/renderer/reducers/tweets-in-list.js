import { RECEIVED_TWEETS_IN_LIST } from '../constants/ActionTypes';

const initialState = { tweets: [] };

export default function tweetsInList(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_TWEETS_IN_LIST:
      return {
        tweets: action.tweets
      };

    default:
      return state;
  }
}
