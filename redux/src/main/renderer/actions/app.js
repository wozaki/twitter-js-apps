import { receivedAccount } from './account';
import { fetchHomeTimeline, receivedHomeTimeline } from './timeline';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

export function setUp(credential) {
  return new TwitterAction({
    credential,
    invoke: twitterClient => dispatch => {
      twitterClient
        .fetchUser()
        .then(user => {
          dispatch(receivedAccount(user, credential, true));
          dispatch(fetchHomeTimeline(credential));
          dispatch(subscribeStream(twitterClient, user.id_str));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

export function subscribeStream(twitterClient, userId) {
  return dispatch => {
    twitterClient.subscribeUserStream(userId)
      .on('tweet', (data) => {
        dispatch(receivedHomeTimeline([data]));
      });
  };
}
