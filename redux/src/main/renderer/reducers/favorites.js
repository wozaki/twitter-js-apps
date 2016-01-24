import { RECEIVED_MY_FAVORITES, RECEIVED_MY_OLD_FAVORITES } from '../constants/ActionTypes';

const initialState = { tweets: [], isOld: false };

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_MY_FAVORITES:
      return {
        tweets: action.tweets.concat(state.tweets),
        isOld: false
      };

    case RECEIVED_MY_OLD_FAVORITES:
      return {
        tweets: state.tweets.concat(action.tweets),
        isOld: true
      };

    default:
      return state;
  }
}
