import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

export function postTweet(text, credential, medias = []) {
  return new TwitterAction({
    credential,//不要？
    invoke: twitterClient => dispatch => {
      twitterClient
        .statusesUpdate({ text, mediaIdCsv: medias.map(m => m.id).join(',') })
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
