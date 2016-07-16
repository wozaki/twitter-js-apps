import * as types from '../constants/ActionTypes';
import { followUsecase } from '../registries/usecases';
import { isLastCursor } from '../../infrastructure/cursor';
import { onError } from './error-handler';

/**
 * @param {string} myId
 * @returns {Function}
 */
export function fetchFollowers(myId) {
  return dispatch => {
    followUsecase
      .getFollowers(myId)
      .then(followers => {
        dispatch(receivedFollowers(followers));
      })
      .catch(error => dispatch(onError(error)));
  };
}

/**
 * @param {string} myId
 * @param {string} nextCursor
 * @returns {Function}
 */
export function fetchFollowersOlderThan(myId, nextCursor) {
  return dispatch => {
    if (isLastCursor(nextCursor)) {
      dispatch(receivedFollowersCompleted())
    } else {
      followUsecase
        .getFollowersOlderThan(myId, nextCursor)
        .then(followers => {
          dispatch(receivedOldFollowers(followers));
        })
        .catch(error => dispatch(onError(error)));
    }
  };
}

function receivedFollowers(followers) {
  return {
    type: types.RECEIVED_FOLLOWERS,
    followers
  };
}

function receivedOldFollowers(followers) {
  return {
    type: types.RECEIVED_OLD_FOLLOWERS,
    followers
  };
}

function receivedFollowersCompleted() {
  return {
    type: types.RECEIVED_FOLLOWERS_COMPLETED
  };
}
