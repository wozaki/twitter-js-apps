import {
  REMOVE_MEDIA_TO_TWEET,
  UPLOADED_MEDIA_TO_TWEET
} from '../constants/ActionTypes';

const initialState = {
  medias: [],
};

export default function mediaToTweet(state = initialState, action) {
  switch (action.type) {
    case REMOVE_MEDIA_TO_TWEET: {
      return { medias: state.medias.filter(m => m.id !== action.mediaId) }
    }

    case UPLOADED_MEDIA_TO_TWEET: {
      return { medias: [...state.medias, action.media] };
    }

    default:
      return state;
  }
}
