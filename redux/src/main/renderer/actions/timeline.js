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

function receivedHomeTimeline(tweets) {
    return {
        type: types.RECEIVED_HOME_TIMELINE,
        tweets
    };
}