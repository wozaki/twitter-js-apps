import TwitterClient from '../../infrastructure/TwitterClient'

function twitterAction(credential, action) {
  const twitterClient = new TwitterClient(
    {
      consumerKey: registries.twitterCredential.consumerKey,
      consumerSecret: registries.twitterCredential.consumerSecret,
      accessToken: credential.accessToken,
      accessTokenSecret: credential.accessTokenSecret
    }
  );

  return action(twitterClient);
}

export default twitterAction
