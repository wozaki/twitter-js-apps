import _ from 'lodash';
import { RECEIVED_USER } from '../constants/ActionTypes';

const initialState = [];

function shapeUser({ user }) {
  return {
    id_str: user.id_str,
    description: user.description,
    followers_count: user.followers_count,
    friends_count: user.friends_count,
    name: user.name,
    profile_image_url: user.profile_image_url,
    protected: user.protected,
    screen_name: user.screen_name,
    statuses_count: user.statuses_count,
    location: user.location,
    entities: user.entities,
  }
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_USER: {
      if (_.isEmpty(state)) {
        return [shapeUser(action)];
      }
      const rejected = _.reject(state, (s) => s.id_str == action.user.id_str);
      return _.concat(rejected, shapeUser(action));
    }

    default:
      return state;
  }
}
