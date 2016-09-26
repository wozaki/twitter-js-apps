import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import twitterAction from './twitterAction';

export function postTweet(text, credential) {
  return dispatch => {
    twitterAction(credential, (twitterClient) => {
      twitterClient
        .statusesUpdate({ text })
        .then(tweet => {
          dispatch(posted(tweet));
        })
        .catch(error => dispatch(onError(error)));
    });
  }
}

function posted(tweet) {
  return {
    type: types.POSTED_TWEET,
    tweet
  };
}
