import * as types from '../constants/ActionTypes';
import { favoriteUsecase } from '../registries/usecases';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

export function fetchMyFavorites(myId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      favoriteUsecase(twitterClient)
        .getList(myId)
        .then(tweets => {
          dispatch(receivedMyFavorites(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function fetchMyFavoritesOlderThan(myId, tweetId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      favoriteUsecase(twitterClient)
        .getListOlderThan(myId, tweetId)
        .then(tweets => {
          dispatch(receivedMyOldFavorites(tweets));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function toggleFavorite(isFavoritedNow, tweetId) {
  return dispatch => {
    if (isFavoritedNow) {
      dispatch(destroyFavorite(tweetId));
    } else {
      dispatch(createFavorite(tweetId));
    }
  };
}

function createFavorite(tweetId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      favoriteUsecase(twitterClient)
        .add(tweetId)
        .then(tweet => {
          dispatch(createdFavorite(tweet));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

function destroyFavorite(tweetId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      favoriteUsecase(twitterClient)
        .remove(tweetId)
        .then(tweet => {
          dispatch(destroyedFavorite(tweet));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

function createdFavorite(tweet) {
  return {
    type: types.CREATED_FAVORITE,
    tweet
  };
}

function destroyedFavorite(tweet) {
  return {
    type: types.DESTROYED_FAVORITE,
    tweet
  };
}

function receivedMyFavorites(tweets) {
  return {
    type: types.RECEIVED_MY_FAVORITES,
    tweets
  };
}

function receivedMyOldFavorites(tweets) {
  return {
    type: types.RECEIVED_MY_OLD_FAVORITES,
    tweets
  };
}
