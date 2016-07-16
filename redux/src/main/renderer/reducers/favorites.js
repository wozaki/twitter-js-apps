import { RECEIVED_MY_FAVORITES, RECEIVED_MY_OLD_FAVORITES, DESTROYED_FAVORITE } from '../constants/ActionTypes';

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

    case DESTROYED_FAVORITE:
      return {
        tweets: state.tweets.filter(t => t.id_str !== action.tweet.id_str),
        isOld: false
      };

    default:
      return state;
  }
}
