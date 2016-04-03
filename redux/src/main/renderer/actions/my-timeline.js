import * as types from '../constants/ActionTypes';
import {timelineUsecase} from '../registries/usecases';
import { onError } from './error-handler';

export function fetchMyTimeline() {
  return dispatch => {
    timelineUsecase
      .getMyTweets()
      .then(tweets => {
        dispatch(receivedMyTimeline(tweets));
      })
      .catch(error => dispatch(onError(error)));
  };
}

export function fetchOldMyTimeline(tweetId) {
  return dispatch => {
    timelineUsecase
      .getMyTweetsOlderThan(tweetId)
      .then(tweets => {
        dispatch(receivedOldMyTimeline(tweets));
      })
      .catch(error => dispatch(onError(error)));
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
