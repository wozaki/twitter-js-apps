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

function createdFavorite(tweet) {
    return {
        type: types.CREATED_FAVORITED,
        tweet
    };
}