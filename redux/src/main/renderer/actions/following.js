import * as types from '../constants/ActionTypes';
import {followingUsecase} from '../registries/usecases';
import {isLastCursor} from '../../infrastructure/cursor';

/**
 * @param {string} myId
 * @returns {Function}
 */
export function fetchFollowing(myId) {
  return dispatch => {
    followingUsecase
      .getFollowing(myId)
      .then(following => {
        dispatch(receivedFollowing(following));
      });
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
      followingUsecase
        .getFollowingOlderThan(myId, nextCursor)
        .then(following => {
          dispatch(receivedOldFollowing(following));
        });
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
