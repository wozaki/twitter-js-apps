import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

export function fetchUser(userId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      twitterClient
        .usersShow({ userId })
        .then(user => {
          dispatch(receivedUser(user));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function receivedUser(user) {
  return {
    type: types.RECEIVED_USER,
    user,
  };
}
