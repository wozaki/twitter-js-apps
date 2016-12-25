import {
  RECEIVED_USER_TIMELINE_TWEETS,
  RECEIVED_OLD_USER_TIMELINE_TWEETS,
  CREATED_FAVORITE,
  DESTROYED_FAVORITE
} from '../constants/ActionTypes'

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

    case CREATED_FAVORITE:
    case DESTROYED_FAVORITE:
      const currentTweets = state.tweets;
      const updatedTweet = action.tweet;
      const replacedTweets = currentTweets.map(tweet => {
        if (tweet.id_str == updatedTweet.id_str) {
          return updatedTweet;
        } else {
          return tweet;
        }
      });

      return {
        userId: state.userId,
        tweets: replacedTweets
      };

    default:
      return state;
  }
}
