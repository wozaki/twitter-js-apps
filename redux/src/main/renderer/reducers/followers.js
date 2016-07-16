import { RECEIVED_FOLLOWERS, RECEIVED_OLD_FOLLOWERS, RECEIVED_FOLLOWERS_COMPLETED } from '../constants/ActionTypes';
import { defaultCursor } from '../../infrastructure/cursor';

const initialState = { users: [], nextCursor: defaultCursor, isOld: false };

export default function following(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_FOLLOWERS:
      return {
        users: action.followers.users.concat(state.users),
        nextCursor: action.followers.next_cursor_str,
        isOld: false
      };

    case RECEIVED_OLD_FOLLOWERS:
      return {
        users: state.users.concat(action.followers.users),
        nextCursor: action.followers.next_cursor_str,
        isOld: true
      };

    case RECEIVED_FOLLOWERS_COMPLETED:
      return {
        users: state.users,
        nextCursor: "0",
        isOld: false
      };

    default:
      return state;
  }
}
