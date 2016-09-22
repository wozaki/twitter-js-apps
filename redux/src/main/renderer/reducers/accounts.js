import _ from 'lodash';
import { RECEIVED_ACCOUNT, SWITCHED_PRIMARY_ACCOUNT } from '../constants/ActionTypes';

const initialState = [{
  created_at: null,
  followers_count: null,
  friends_count: null,
  id_str: null,
  name: null,
  profile_image_url: null,
  protected: null,
  screen_name: null,
  statuses_count: null,
  is_initial_state: true,
  is_primary: true
}];

function createAccountFrom(action) {
  return {
    created_at: action.user.created_at,
    followers_count: action.user.followers_count,
    friends_count: action.user.friends_count,
    id_str: action.user.id_str,
    name: action.user.name,
    profile_image_url: action.user.profile_image_url,
    protected: action.user.protected,
    screen_name: action.user.screen_name,
    statuses_count: action.user.statuses_count,
    is_primary: action.is_primary
  }
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_ACCOUNT:
      if (state[0].is_initial_state) {
        return [createAccountFrom(action)];
      }
      const rejected = _.reject(state, (s) => s.id_str == action.user.id_str);
      return _.concat(rejected, createAccountFrom(action));
    case SWITCHED_PRIMARY_ACCOUNT:
      const { accountId } = action;
      return _.map(state, (account) => {
        account.is_primary = account.id_str == accountId;
        return account;
      });
    default:
      return state;
  }
}
