import { RECEIVED_USER_TIMELINE_TWEETS, RECEIVED_OLD_USER_TIMELINE_TWEETS } from '../constants/ActionTypes'

const initialState = { userId: null, tweets: [] };

export default function userTimeline(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_USER_TIMELINE_TWEETS:
      return {
        userId: action.userId,
        tweets: action.tweets
      };

    case RECEIVED_OLD_USER_TIMELINE_TWEETS:
      return {
        userId: action.userId,
        tweets: state.tweets.concat(action.tweets)
      };

    default:
      return state;
  }
}
