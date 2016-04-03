import * as types from '../constants/ActionTypes';
import twitterClient from '../registries/twitterClient';
import { onError } from './error-handler';

export function fetchAccount() {
  return dispatch => {
    twitterClient
      .fetchUser()
      .then(user => {
        dispatch(receivedAccount(user));
      })
      .catch(error => dispatch(onError(error)));
  };
}

export function receivedAccount(user) {
  return {
    type: types.RECEIVED_ACCOUNT,
    user
  };
}
