import * as types from '../constants/ActionTypes';
import {followUsecase} from '../registries/usecases';
import {isLastCursor} from '../../infrastructure/cursor';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

/**
 * @param {string} myId
 * @returns {TwitterAction}
 */
export function fetchFollowing(myId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      followUsecase(twitterClient)
        .getFollowing(myId)
        .then(following => {
          dispatch(receivedFollowing(following));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

/**
 * @param {string} myId
 * @param {string} nextCursor
 * @returns {TwitterAction}
 */
export function fetchFollowingOlderThan(myId, nextCursor) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      if (isLastCursor(nextCursor)) {
        dispatch(receivedFollowingCompleted())
      } else {
        followUsecase(twitterClient)
          .getFollowingOlderThan(myId, nextCursor)
          .then(following => {
            dispatch(receivedOldFollowing(following));
          })
          .catch(error => dispatch(onError(error)));
      }
    }
  });
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
