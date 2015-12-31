import {RECEIVED_HOME_TIMELINE} from '../constants/ActionTypes'

const initialState = {tweets: []};

export default function timeline(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_HOME_TIMELINE:
            return {
                tweets: action.tweets.concat(state.tweets)
            };
        default:
            return state;
    }
}
