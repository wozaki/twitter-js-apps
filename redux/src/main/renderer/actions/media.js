import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

function upload(media, actionType) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      twitterClient
        .mediaUpload({ media: media.buffer })
        .then(response => {
          const m = media.uploaded(response.media_id_string);
          dispatch(uploadedMedia(actionType, m));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function uploadToTweet(media) {
  return upload(media, types.UPLOADED_MEDIA_TO_TWEET);
}

export function removeMedia(mediaId) {
  return {
    type: types.REMOVE_MEDIA_TO_TWEET,
    mediaId,
  };
}

function uploadedMedia(actionType, media) {
  return {
    type: actionType,
    media,
  };
}
