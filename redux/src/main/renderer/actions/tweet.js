import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

export function postTweet(text, credential, mediaId = null) {
  return new TwitterAction({
    credential,//不要？
    invoke: twitterClient => dispatch => {
      twitterClient
        .statusesUpdate({ text, mediaId })
        .then(tweet => {
          dispatch(posted(tweet));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

function posted(tweet) {
  return {
    type: types.POSTED_TWEET,
    tweet
  };
}
