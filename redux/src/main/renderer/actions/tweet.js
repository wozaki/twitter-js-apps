import * as types from '../constants/ActionTypes'
import {twitterClient} from '../registories/registory.js'

export function postTweet(text) {
    return dispatch => {
        twitterClient
            .postTweet({text: text})
            .then(({ tweet }) => {
                dispatch(posted(tweet))
            });
    }
}

function posted(tweet) {
    return {
        type: types.POSTED_TWEET,
        tweet
    };
}
