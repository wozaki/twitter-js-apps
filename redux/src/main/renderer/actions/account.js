import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import twitterAction from './twitterAction';
import { subscribeStream } from './app';
import { fetchHomeTimeline } from './timeline';
import { Accounts } from '../../domain/models/Accounts'

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

export function removeAccount(account) {
  return (dispatch, getState) => {
    dispatch(_removeAccount(account));

    if (account.isPrimary) {
      const { accounts } = getState();
      const nextPrimaryAccount = _.head(Accounts.fromJson(accounts).subAccounts);
      if (_.isUndefined(nextPrimaryAccount)) {
        return
      }
      dispatch(switchPrimaryAccountTo(nextPrimaryAccount));
    }
  };
}

function _removeAccount(account) {
  return {
    type: types.REMOVE_ACCOUNT,
    accountId: account.id
  };
}

function switchedPrimaryAccountTo(accountId) {
  return {
    type: types.SWITCHED_PRIMARY_ACCOUNT,
    accountId
  };
}
