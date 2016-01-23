import { RECEIVED_ACCOUNT } from '../constants/ActionTypes';

const initialState = {
  created_at: null,
  followers_count: null,
  following_count: null, //friends_count
  id_str: null,
  name: null,
  profile_image_url: null,
  protected: null,
  screen_name: null,
  tweet_count: null //statuses_count
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_ACCOUNT:
      return Object.assign({}, state, {
        created_at: action.user.created_at,
        followers_count: action.user.followers_count,
        following_count: action.user.friends_count,
        id_str: action.user.id_str,
        name: action.user.name,
        profile_image_url: action.user.profile_image_url,
        protected: action.user.protected,
        screen_name: action.user.screen_name,
        tweet_count: action.user.statuses_count
      });
    default:
      return state;
  }
}
