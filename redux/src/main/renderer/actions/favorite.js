import * as types from '../constants/ActionTypes'
import {twitterClient} from '../registories/registory.js'

export function createFavorite(tweetId) {
    return dispatch => {
        twitterClient
            .favorite({tweetId: tweetId})
            .then(({ tweet }) => {
                dispatch(createdFavorite(tweet));
            });
    }
}

export function destroyFavorite(tweetId) {
    return dispatch => {
        twitterClient
            .unfavorite({tweetId: tweetId})
            .then(({ tweet }) => {
                dispatch(createdFavorite(tweet));
            });
    }
}

function createdFavorite(tweet) {
    return {
        type: types.CREATED_FAVORITED,
        tweet
    };
}

function destroyedFavorite(tweet) {
    return {
        type: types.DESTROYED_FAVORITE,
        tweet
    };
}