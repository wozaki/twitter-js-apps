import {RECEIVED_HOME_TIMELINE} from '../constants/ActionTypes'

export default function timeline(state = {}, action) {
    switch (action.type) {
        case RECEIVED_HOME_TIMELINE:
            return Object.assign({}, state, {
                tweets: action.tweets
            });
        default:
            return state;
    }
}
