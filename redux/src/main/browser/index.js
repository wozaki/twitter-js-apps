import twitterConfig from './twitter-config.js'
import Application from './application'

global.application = new Application(twitterConfig);
global.application.run((twitterCredential, credential) => {
  global.twitterCredential = twitterCredential;
  global.credential = credential;
});
