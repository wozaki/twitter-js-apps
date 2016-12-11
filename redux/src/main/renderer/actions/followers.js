import * as types from '../constants/ActionTypes';
import { followUsecase } from '../registries/usecases';
import { isLastCursor } from '../../infrastructure/cursor';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

/**
 * @param {string} userId
 * @returns {TwitterAction}
 */
export function fetchFollowers(userId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      followUsecase(twitterClient)
        .getFollowers(userId)
        .then(followers => {
          dispatch(receivedFollowers(followers));
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
export function fetchFollowersOlderThan(userId, nextCursor) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      if (isLastCursor(nextCursor)) {
        dispatch(receivedFollowersCompleted())
      } else {
        followUsecase(twitterClient)
          .getFollowersOlderThan(userId, nextCursor)
          .then(followers => {
            dispatch(receivedOldFollowers(followers));
          })
          .catch(error => dispatch(onError(error)));
      }
    }
  });
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
