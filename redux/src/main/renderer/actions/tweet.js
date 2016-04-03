import * as types from '../constants/ActionTypes';
import twitterClient from '../registries/twitterClient';
import { onError } from './error-handler';

export function postTweet(text) {
  return dispatch => {
    twitterClient
      .statusesUpdate({ text })
      .then(tweet => {
        dispatch(posted(tweet));
      })
      .catch(error => dispatch(onError(error)));
  };
}

function posted(tweet) {
  return {
    type: types.POSTED_TWEET,
    tweet
  };
}
