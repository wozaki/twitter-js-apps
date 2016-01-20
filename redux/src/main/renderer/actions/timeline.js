import * as types from '../constants/ActionTypes';
import {timelineUsecase} from '../registries/usecases';

export function fetchHomeTimeline() {
  return dispatch => {
    timelineUsecase
      .fetchHomeTweets()
      .then(({ tweets }) => {
        dispatch(receivedHomeTimeline(tweets));
      });
  };
}

/**
 * @param {string} tweetId
 */
export function fetchOldHomeTimeline(tweetId) {
  return dispatch => {
    timelineUsecase
      .fetchHomeTweetsOlderThan(tweetId)
      .then(({ tweets }) => {
        const filteredOffsetTweet = tweets.filter(t => t.id_str !== tweetId);
        dispatch(receivedOldHomeTimeline(filteredOffsetTweet));
      });
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
