import twitterClient from '../registries/twitterClient';
import { receivedAccount } from './account';
import { fetchHomeTimeline, receivedHomeTimeline } from './timeline';
import { onError } from './error-handler';

export function setUp() {
  return dispatch => {
    twitterClient
      .fetchUser()
      .then(user => {
          dispatch(receivedAccount(user, true));
          dispatch(fetchHomeTimeline());
          dispatch(subscribeStream(user.id_str));
        })
      .catch(error => dispatch(onError(error)));
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
