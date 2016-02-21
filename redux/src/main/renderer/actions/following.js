import * as types from '../constants/ActionTypes';
import {followingUsecase} from '../registries/usecases';

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

function receivedFollowing(following) {
  return {
    type: types.RECEIVED_FOLLOWING,
    following
  };
}
