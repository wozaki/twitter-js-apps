import { RECEIVED_MY_FAVORITES } from '../constants/ActionTypes';

const initialState = { tweets: [], isOld: false };

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_MY_FAVORITES:
      return {
        tweets: action.tweets.concat(state.tweets),
        isOldTimeline: false
      };

    default:
      return state;
  }
}
