import { remote } from 'electron'
import TwitterClient from '../../infrastructure/TwitterClient'
const twitterCredential = remote.getGlobal('twitterCredential');

function twitterAction(credential, action) {
  const twitterClient = new TwitterClient(
    {
      consumerKey: twitterCredential.consumerKey,
      consumerSecret: twitterCredential.consumerSecret,
      accessToken: credential.accessToken,
      accessTokenSecret: credential.accessTokenSecret
    }
  );

  return action(twitterClient);
}

export default twitterAction
