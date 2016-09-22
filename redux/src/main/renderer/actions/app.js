import { receivedAccount } from './account';
import { fetchHomeTimeline, receivedHomeTimeline } from './timeline';
import { onError } from './error-handler';
import twitterAction from './twitterAction';

export function setUp(credential) {
  return dispatch => {
    twitterAction(credential, (twitterClient) => {
      twitterClient
        .fetchUser()
        .then(user => {
          dispatch(receivedAccount(user, credential, true));
          dispatch(fetchHomeTimeline(credential));
          dispatch(subscribeStream(twitterClient, user.id_str));
        })
        .catch(error => dispatch(onError(error)));
    });
  }
}

function subscribeStream(twitterClient, userId) {
  return dispatch => {
    twitterClient.subscribeUserStream(userId)
      .on('tweet', (data) => {
        dispatch(receivedHomeTimeline([data]));
      });
  };
}
