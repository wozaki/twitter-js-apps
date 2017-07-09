import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

function upload(media, actionType) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      twitterClient
        .mediaUpload({ media: media.buffer })
        .then(response => {
          dispatch(uploadedMedia(actionType, media, response));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function uploadToTweet(media) {
  return upload(media, types.UPLOADED_MEDIA_TO_TWEET);
}

function uploadedMedia(actionType, media, response) {
  return {
    type: actionType,
    media,
    response
  };
}