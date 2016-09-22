import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import twitterAction from './twitterAction';

export function fetchAccount(credential, isPrimary) {
  return dispatch => {
    twitterAction(credential, (twitterClient) => {
      twitterClient
        .fetchUser()
        .then(user => {
          dispatch(receivedAccount(user, isPrimary));
        })
        .catch(error => dispatch(onError(error)));
    });
  };
}

export function receivedAccount(user, isPrimary) {
  return {
    type: types.RECEIVED_ACCOUNT,
    user,
    is_primary: isPrimary
  };
}
