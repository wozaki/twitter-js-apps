import * as types from '../constants/ActionTypes';
import twitterClient from '../registries/twitterClient';

export function postTweet(text) {
  return dispatch => {
    twitterClient
      .postTweet({ text })
      .then(({ tweet }) => {
        dispatch(posted(tweet));
      });
  };
}

function posted(tweet) {
  return {
    type: types.POSTED_TWEET,
    tweet
  };
}
