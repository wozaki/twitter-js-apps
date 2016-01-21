import * as types from '../constants/ActionTypes';
import {favoriteUsecase} from '../registries/usecases';

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
  return dispatch => {
    favoriteUsecase
      .add(tweetId)
      .then(({ tweet }) => {
        dispatch(createdFavorite(tweet));
      });
  };
}

function destroyFavorite(tweetId) {
  return dispatch => {
    favoriteUsecase
      .remove(tweetId)
      .then(({ tweet }) => {
        dispatch(destroyedFavorite(tweet));
      });
  };
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
