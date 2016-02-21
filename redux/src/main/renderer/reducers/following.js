import { RECEIVED_FOLLOWING } from '../constants/ActionTypes';

const initialState = { users: [], isOld: false };

export default function following(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_FOLLOWING:
      return {
        users: action.following.users.concat(state.users),
        isOld: false
      };

    default:
      return state;
  }
}
