import { remote } from 'electron'
import TwitterClient from '../../infrastructure/TwitterClient'
const twitterCredential = remote.getGlobal('twitterCredential');

export default new TwitterClient(
    {
        consumerKey: twitterCredential.consumerKey,
        consumerSecret: twitterCredential.consumerSecret,
        accessToken: twitterCredential.accessToken,
        accessTokenSecret: twitterCredential.accessTokenSecret
    }
);
