import remote from 'remote'
import TwitterClient from '../../infrastructure/TwitterClient'

const twitterCredential = remote.getGlobal('twitterCredential');

export const twitterClient = new TwitterClient(
    {
        consumerKey: twitterCredential.consumerKey,
        consumerSecret: twitterCredential.consumerSecret,
        accessToken: twitterCredential.accessToken,
        accessTokenSecret: twitterCredential.accessTokenSecret
    }
);
