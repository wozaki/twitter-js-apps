import * as types from '../constants/ActionTypes';
import {timelineUsecase} from '../registries/usecases';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

export function fetchMyTimeline() {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      timelineUsecase(twitterClient)
        .getMyTweets()
        .then(tweets => {
          dispatch(receivedMyTimeline(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function fetchOldMyTimeline(tweetId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      timelineUsecase(twitterClient)
        .getMyTweetsOlderThan(tweetId)
        .then(tweets => {
          dispatch(receivedOldMyTimeline(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
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
