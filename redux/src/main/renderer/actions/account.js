import * as types from '../constants/ActionTypes';
import twitterClient from '../registries/twitterClient';

export function fetchAccount() {
  return dispatch => {
    twitterClient
      .fetchUser()
      .then(({ user }) => {
        dispatch(receivedAccount(user));
      });
  };
}

export function receivedAccount(user) {
  return {
    type: types.RECEIVED_ACCOUNT,
    user
  };
}
