import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import twitterAction from './twitterAction';
import { subscribeStream } from './app';
import { fetchHomeTimeline } from './timeline';

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
  const credential = account.credential;

  return dispatch => {
    twitterAction(credential, (twitterClient) => {
      dispatch(fetchHomeTimeline(credential));
      dispatch(subscribeStream(twitterClient, account.id));
      dispatch(switchedPrimaryAccountTo(account.id));
    });
  };
}

function switchedPrimaryAccountTo(accountId) {
  return {
    type: types.SWITCHED_PRIMARY_ACCOUNT,
    accountId
  };
}
