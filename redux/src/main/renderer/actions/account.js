import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import twitterAction from './twitterAction';
import { setUp } from './app';

export function fetchAccount(credential, isPrimary) {
  return dispatch => {
    twitterAction(credential, (twitterClient) => {
      twitterClient
        .fetchUser()
        .then(user => {
          dispatch(receivedAccount(user, credential, isPrimary));
        })
        .catch(error => dispatch(onError(error)));
    });
  };
}

export function receivedAccount(user, credential, isPrimary) {
  return {
    type: types.RECEIVED_ACCOUNT,
    user,
    credential,
    is_primary: isPrimary
  };
}

export function switchPrimaryAccountTo(account) {
  return dispatch => {
    dispatch(setUp(account.credential))
  };
}
