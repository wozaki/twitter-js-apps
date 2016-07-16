import * as types from '../constants/ActionTypes';
import {followUsecase} from '../registries/usecases';
import {isLastCursor} from '../../infrastructure/cursor';
import { onError } from './error-handler';

/**
 * @param {string} myId
 * @returns {Function}
 */
export function fetchFollowing(myId) {
  return dispatch => {
    followUsecase
      .getFollowing(myId)
      .then(following => {
        dispatch(receivedFollowing(following));
      })
      .catch(error => dispatch(onError(error)));
  };
}

/**
 * @param {string} myId
 * @param {string} nextCursor
 * @returns {Function}
 */
export function fetchFollowingOlderThan(myId, nextCursor) {
  return dispatch => {
    if (isLastCursor(nextCursor)) {
      dispatch(receivedFollowingCompleted())
    } else {
      followUsecase
        .getFollowingOlderThan(myId, nextCursor)
        .then(following => {
          dispatch(receivedOldFollowing(following));
        })
        .catch(error => dispatch(onError(error)));
    }
  };
}

function receivedFollowing(following) {
  return {
    type: types.RECEIVED_FOLLOWING,
    following
  };
}

function receivedOldFollowing(following) {
  return {
    type: types.RECEIVED_OLD_FOLLOWING,
    following
  };
}

function receivedFollowingCompleted() {
  return {
    type: types.RECEIVED_FOLLOWING_COMPLETED
  };
}
