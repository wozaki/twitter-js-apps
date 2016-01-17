import {getGlobal} from 'remote'
import TwitterClient from '../../infrastructure/TwitterClient'
const twitterCredential = getGlobal('twitterCredential');

export default new TwitterClient(
    {
        consumerKey: twitterCredential.consumerKey,
        consumerSecret: twitterCredential.consumerSecret,
        accessToken: twitterCredential.accessToken,
        accessTokenSecret: twitterCredential.accessTokenSecret
    }
);