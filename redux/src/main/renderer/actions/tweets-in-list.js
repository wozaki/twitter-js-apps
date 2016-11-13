import * as types from '../constants/ActionTypes';
import ListsUsecase from '../../domain/usecases/ListsUsecase';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

/**
 * @param {string} listId
 * @return {TwitterAction}
 */
export function fetchTweets(listId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      new ListsUsecase(twitterClient)
        .getTweets(listId)
        .then(tweets => {
          dispatch(receivedFirstTweetsInList(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

/**
 * @param {string} listId
 * @param {string} maxTweetId
 * @return {TwitterAction}
 */
export function fetchOlderTweets(listId, maxTweetId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      new ListsUsecase(twitterClient)
        .getOlderTweets(listId, maxTweetId)
        .then(tweets => {
          dispatch(receivedOlderTweetsInList(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

function receivedFirstTweetsInList(tweets) {
  return {
    type: types.RECEIVED_FIRST_TWEETS_IN_LIST,
    tweets
  };
}

function receivedOlderTweetsInList(tweets) {
  return {
    type: types.RECEIVED_OLDER_TWEETS_IN_LIST,
    tweets
  };
}
