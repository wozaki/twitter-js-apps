import twitterClient from '../registries/twitterClient';
import { receivedAccount } from './account';
import { fetchHomeTimeline, receivedHomeTimeline } from './timeline';

export function setUp() {
  return dispatch => {
    twitterClient
      .fetchUser()
      .then(({ user }) => {
        dispatch(receivedAccount(user));
        dispatch(fetchHomeTimeline());
        dispatch(subscribeStream(user.id_str));
      });
  };
}

function subscribeStream(userId) {
  return dispatch => {
    twitterClient.subscribeUserStream(userId)
      .on('tweet', (data) => {
        dispatch(receivedHomeTimeline([data]));
      });
  };
}
