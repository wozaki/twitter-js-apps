import * as types from '../constants/ActionTypes';
import { timelineUsecase } from '../registries/usecases';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

/**
 * @param {string} userId
 * @return {TwitterAction}
 */
export function fetchTweets(userId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      timelineUsecase(twitterClient)
        .getUserTweets(userId)
        .then(tweets => {
          dispatch(receivedTweets(userId, tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

/**
 * @param {string} userId
 * @param {string} tweetId
 * @return {TwitterAction}
 */
export function fetchOldTweets(userId, tweetId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      timelineUsecase(twitterClient)
        .getTweetsOlderThan(userId, tweetId)
        .then(tweets => {
          dispatch(receivedOldTweets(userId, tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

function receivedTweets(userId, tweets) {
  return {
    type: types.RECEIVED_USER_TIMELINE_TWEETS,
    userId,
    tweets
  };
}

function receivedOldTweets(userId, tweets) {
  return {
    type: types.RECEIVED_OLD_USER_TIMELINE_TWEETS,
    userId,
    tweets
  };
}
