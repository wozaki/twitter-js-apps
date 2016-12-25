import * as types from '../constants/ActionTypes';
import {followUsecase} from '../registries/usecases';
import {isLastCursor} from '../../infrastructure/cursor';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

/**
 * @param {string} userId
 * @returns {TwitterAction}
 */
export function fetchFollowing(userId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      followUsecase(twitterClient)
        .getFollowing(userId)
        .then(following => {
          dispatch(receivedFollowing(userId, following));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

/**
 * @param {string} userId
 * @param {string} nextCursor
 * @returns {TwitterAction}
 */
export function fetchFollowingOlderThan(userId, nextCursor) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      if (isLastCursor(nextCursor)) {
        dispatch(receivedFollowingCompleted(userId))
      } else {
        followUsecase(twitterClient)
          .getFollowingOlderThan(userId, nextCursor)
          .then(following => {
            dispatch(receivedOldFollowing(userId, following));
          })
          .catch(error => dispatch(onError(error)));
      }
    }
  });
}

function receivedFollowing(userId, following) {
  return {
    type: types.RECEIVED_FOLLOWING,
    userId,
    following
  };
}

function receivedOldFollowing(userId, following) {
  return {
    type: types.RECEIVED_OLD_FOLLOWING,
    userId,
    following
  };
}

function receivedFollowingCompleted(userId) {
  return {
    type: types.RECEIVED_FOLLOWING_COMPLETED,
    userId
  };
}
