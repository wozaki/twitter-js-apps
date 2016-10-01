import * as types from '../constants/ActionTypes';
import { timelineUsecase } from '../registries/usecases';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

export function fetchHomeTimeline(credential) {
  return new TwitterAction({
    credential,
    invoke: twitterClient => dispatch => {
      timelineUsecase(twitterClient)
        .fetchHomeTweets()
        .then(tweets => {
          dispatch(refreshHomeTimeline(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

/**
 * @param {string} tweetId
 */
export function fetchOldHomeTimeline(tweetId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      timelineUsecase(twitterClient)
        .fetchHomeTweetsOlderThan(tweetId)
        .then(tweets => {
          dispatch(receivedOldHomeTimeline(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function receivedHomeTimeline(tweets) {
  return {
    type: types.RECEIVED_HOME_TIMELINE,
    tweets
  };
}

function refreshHomeTimeline(tweets) {
  return {
    type: types.REFRESH_HOME_TIMELINE,
    tweets
  };
}

function receivedOldHomeTimeline(tweets) {
  return {
    type: types.RECEIVED_OLD_HOME_TIMELINE,
    tweets
  };
}
