import * as types from '../constants/ActionTypes';
import {timelineUsecase} from '../registries/usecases';

export function fetchMyTimeline() {
  return dispatch => {
    timelineUsecase
      .getMyTweets()
      .then(tweets => {
        dispatch(receivedMyTimeline(tweets));
      });
  };
}

export function fetchOldMyTimeline(tweetId) {
  return dispatch => {
    timelineUsecase
      .getMyTweetsOlderThan(tweetId)
      .then(tweets => {
        dispatch(receivedOldMyTimeline(tweets));
      });
  };
}

function receivedMyTimeline(tweets) {
  return {
    type: types.RECEIVED_MY_TIMELINE,
    tweets
  };
}

function receivedOldMyTimeline(tweets) {
  return {
    type: types.RECEIVED_OLD_MY_TIMELINE,
    tweets
  };
}
