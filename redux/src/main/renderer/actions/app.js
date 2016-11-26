import { fetchAccount } from './account';
import { fetchHomeTimeline, receivedHomeTimeline } from './timeline';
import { TwitterAction } from '../middlewares/twitterClient';

/**
 *
 * @param {Credential} credential
 * @return {TwitterAction}
 */
export function setUp(credential) {
  return new TwitterAction({
    credential,
    invoke: twitterClient => dispatch => {
      dispatch(fetchAccount(credential, true));
      dispatch(fetchHomeTimeline(credential));
      dispatch(subscribeStream(twitterClient, credential.userId));
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
