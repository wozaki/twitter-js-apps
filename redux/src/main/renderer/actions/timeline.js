import * as types from '../constants/ActionTypes';
import {timelineUsecase} from '../registries/usecases';
import { onError } from './error-handler';

export function fetchHomeTimeline() {
  return dispatch => {
    timelineUsecase
      .fetchHomeTweets()
      .then(tweets => {
        dispatch(receivedHomeTimeline(tweets));
      })
      .catch(error => dispatch(onError(error)));
  };
}

/**
 * @param {string} tweetId
 */
export function fetchOldHomeTimeline(tweetId) {
  return dispatch => {
    timelineUsecase
      .fetchHomeTweetsOlderThan(tweetId)
      .then(tweets => {
        dispatch(receivedOldHomeTimeline(tweets));
      })
      .catch(error => dispatch(onError(error)));
  };
}

export function receivedHomeTimeline(tweets) {
  return {
    type: types.RECEIVED_HOME_TIMELINE,
    tweets
  };
}

function receivedOldHomeTimeline(tweets) {
  return {
    type: types.RECEIVED_OLD_HOME_TIMELINE,
    tweets
  };
}
