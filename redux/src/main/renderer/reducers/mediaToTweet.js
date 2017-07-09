import _ from 'lodash';
import {
  REMOVE_MEDIA_TO_TWEET,
  UPLOADED_MEDIA_TO_TWEET
} from '../constants/ActionTypes';

const initialState = {
  media: null,
};

function shapeAccount(action) {
  return {
    mediaId: action.response.media_id_string,
    media: action.media,
  }
}

export default function mediaToTweet(state = initialState, action) {
  switch (action.type) {
    case REMOVE_MEDIA_TO_TWEET: {
      return initialState;
    }

    case UPLOADED_MEDIA_TO_TWEET: {
      return { media: action.media };
    }

    default:
      return state;
  }
}
