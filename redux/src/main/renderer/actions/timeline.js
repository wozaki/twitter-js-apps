import * as types from '../constants/ActionTypes'
import {twitterClient} from '../registories/registory.js'

export function fetchHomeTimeline() {
    return dispatch => {
        twitterClient
            .fetchHomeTimelineTweets()
            .then(({ tweets }) => {
                console.log(tweets);
                dispatch(receivedHomeTimeline(tweets))
            });
    }
}

/**
 * @param {string} tweetId
 */
export function fetchOldHomeTimeline(tweetId) {
    console.log("fetchOldHomeTimeline");

    return dispatch => {
        twitterClient
            .fetchOldHomeTimelineTweets({maxId:tweetId})
            .then(({ tweets }) => {
                console.log("fetchOldHomeTimeline", tweets);
                dispatch(receivedOldHomeTimeline(tweets))
            });
    }
}

export function receivedHomeTimeline(tweets) {
    return {
        type: types.RECEIVED_HOME_TIMELINE,
        tweets
    };
}

function receivedOldHomeTimeline(tweets) {
    return {
        type: types.RECEIVED_OLD_HOME_TIMELINE,
        tweets
    };
}