import * as types from '../constants/ActionTypes'
import {twitterClient} from '../registories/registory.js'

export function fetchAccount() {
    return dispatch => {
        twitterClient
            .fetchUser()
            .then(({ user }) => {
                dispatch(receivedUser(user))
            });
    }
}

function receivedUser(user) {
    return {
        type: types.RECEIVED_ACCOUNT,
        user
    };
}