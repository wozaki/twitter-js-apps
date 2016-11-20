import _ from 'lodash';
import { RECEIVED_FIRST_TWEETS_IN_LIST, RECEIVED_OLDER_TWEETS_IN_LIST } from '../constants/ActionTypes';

const initialState = {};

export default function tweetsInList(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_FIRST_TWEETS_IN_LIST:
      return Object.assign({}, state,
        { [action.listId]: action.tweets }
      );

    case RECEIVED_OLDER_TWEETS_IN_LIST:
      const previousTweets = _.defaultTo(state[action.listId], []);
      return Object.assign({}, state,
        { [action.listId]: previousTweets.concat(action.tweets) }
      );

    default:
      return state;
  }
}
