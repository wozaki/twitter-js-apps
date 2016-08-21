import { RECEIVED_FOLLOWING, RECEIVED_OLD_FOLLOWING, RECEIVED_FOLLOWING_COMPLETED } from '../constants/ActionTypes';
import { defaultCursor } from '../../infrastructure/cursor';

const initialState = { users: [], nextCursor: defaultCursor };

export default function following(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_FOLLOWING:
      return {
        users: action.following.users.concat(state.users),
        nextCursor: action.following.next_cursor_str
      };

    case RECEIVED_OLD_FOLLOWING:
      return {
        users: state.users.concat(action.following.users),
        nextCursor: action.following.next_cursor_str
      };

    case RECEIVED_FOLLOWING_COMPLETED:
      return {
        users: state.users,
        nextCursor: "0"
      };

    default:
      return state;
  }
}
