import _ from 'lodash';
import { RECEIVED_ACCOUNT, REPLACE_ACCOUNTS, REMOVE_ACCOUNT, SWITCHED_PRIMARY_ACCOUNT } from '../constants/ActionTypes';

const initialState = [];

function shapeAccount(action) {
  return {
    created_at: action.user.created_at,
    credential: action.credential,
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
    case RECEIVED_ACCOUNT: {
      if (_.isEmpty(state)) {
        return [shapeAccount(action)];
      }
      const rejected = _.reject(state, (s) => s.id_str == action.user.id_str);
      return _.concat(rejected, shapeAccount(action));
    }

    case REPLACE_ACCOUNTS: {
      return action.accounts;
    }

    case REMOVE_ACCOUNT: {
      const { accountId } = action;
      return _.reject(state, (account) => {
        return account.id_str == accountId;
      });
    }

    case SWITCHED_PRIMARY_ACCOUNT: {
      const { accountId } = action;
      return _.map(state, (account) => {
        account.is_primary = account.id_str == accountId;
        return account;
      });
    }

    default:
      return state;
  }
}
