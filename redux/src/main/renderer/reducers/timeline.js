import {RECEIVED_HOME_TIMELINE, RECEIVED_OLD_HOME_TIMELINE, CREATED_FAVORITE, DESTROYED_FAVORITE} from '../constants/ActionTypes'

const initialState = {tweets: [], isOldTimeline: false};

export default function timeline(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_HOME_TIMELINE:
            return {
                tweets: action.tweets.concat(state.tweets),
                isOldTimeline: false
            };

        case RECEIVED_OLD_HOME_TIMELINE:
            return {
                tweets: state.tweets.concat(action.tweets),
                isOldTimeline: true
            };

        case CREATED_FAVORITE:
        case DESTROYED_FAVORITE:
            const currentTweets = state.tweets;
            const updatedTweet = action.tweet;
            const replacedTweets = currentTweets.map(tweet => {
                if (tweet.id_str == updatedTweet.id_str) {
                    return updatedTweet;
                } else {
                    return tweet;
                }
            });

            return {
                tweets: replacedTweets,
                isOldTimeline: false
            };

        default:
            return state;
    }
}
