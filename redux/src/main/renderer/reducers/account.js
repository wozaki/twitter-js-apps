import { RECEIVED_ACCOUNT } from '../constants/ActionTypes';

const initialState = {
  profile_image_url: null
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_ACCOUNT:
      return Object.assign({}, state, {
        profile_image_url: action.user.profile_image_url
      });
    default:
      return state;
  }
}
